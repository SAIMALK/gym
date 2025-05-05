
import asyncHandler from "../middleware/asyncHandler.js";
import Member from "../models/memberModel.js";
import Counter from "../models/counterModel.js";

const getNextSequenceValue = async (collectionName) => {
  const result = await Counter.findOneAndUpdate(
    { _id: collectionName },  // Look for the collection name
    { $inc: { seq: 1 } },     // Increment the seq value
    { new: true, upsert: true } // If no document, create a new one
  );

  return result.seq;  // Return the incremented ID
};

const getMembers = asyncHandler(async (req, res) => {
  const pageSize = process.env.PAGINATION_LIMIT;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        title: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Member.countDocuments({ ...keyword });
  const members = await Member.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ members, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Fetch single member
// @route   GET /api/member/:id


const getMemberById = asyncHandler(async (req, res) => {
  // Convert req.params.id to a number (integer) to match the custom _id
  const memberId = Number(req.params.id); // Convert the ID to an integer

  // Check if the conversion was successful
  if (isNaN(memberId)) {
    res.status(400).json({ message: "Invalid member ID" });
    return;
  }

  // Query the member by integer _id
  const member = await Member.findOne({ _id: memberId });

  if (!member) {
    res.status(404);
    throw new Error("Member not found");
  }

  // Refresh status based on current date and membershipEndDate
  const now = new Date();
  const newStatus = now <= member.membershipEndDate ? "Active" : "Inactive";
  if (member.status !== newStatus) {
    member.status = newStatus;
    await member.save();
  }

  res.json(member);
});
// @desc    Create a member
// @route   POST /api/members
// @access  Private/Admin
// Updated createMember function with improved error handling and validation
const createMember = asyncHandler(async (req, res) => {
  try {
    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'membershipType', 'membershipStartDate', 'membershipEndDate'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    // Parse and validate dates
    let membershipStartDate, membershipEndDate, joinDate;
    
    try {
      membershipStartDate = new Date(req.body.membershipStartDate);
      membershipEndDate = new Date(req.body.membershipEndDate);
      joinDate = req.body.joinDate ? new Date(req.body.joinDate) : new Date();
      
      // Check if dates are valid
      if (isNaN(membershipStartDate.getTime()) || isNaN(membershipEndDate.getTime()) || isNaN(joinDate.getTime())) {
        return res.status(400).json({
          success: false,
          message: 'Invalid date format'
        });
      }
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Error parsing dates'
      });
    }

    // Handle image data
    let imageData = null;
    if (req.body.image) {
      if (req.body.image.startsWith('data:image')) {
        // Check the base64 string size
        const base64WithoutPrefix = req.body.image.split(',')[1] || '';
        const sizeInBytes = Math.ceil((base64WithoutPrefix.length / 4) * 3);
        const maxSizeInBytes = 1000000; // 1MB limit
        
        if (sizeInBytes > maxSizeInBytes) {
          return res.status(400).json({
            success: false,
            message: 'Image size too large. Please use an image under 1MB.'
          });
        }
        
        // Keep the image as-is, it's already optimized by the frontend
        imageData = req.body.image;
      } else {
        // It's a URL - keep it as is
        imageData = req.body.image;
      }
    }

    // Get the next ID for the member
    const nextId = await getNextSequenceValue("members");

    // Prepare member data with sanitized values
    const memberData = {
      _id: nextId,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      membershipType: req.body.membershipType,
      membershipStartDate,
      membershipEndDate,
      joinDate,
      image: imageData,
      fatherName: req.body.fatherName || '',
      age: req.body.age ? Number(req.body.age) : null,
      gender: req.body.gender || '',
      status: new Date() <= membershipEndDate ? "Active" : "Inactive"
    };

    // Create the new member
    const member = new Member(memberData);

    // Save the member
    const savedMember = await member.save();

    // Return success response
    res.status(201).json({
      success: true,
      data: {
        _id: savedMember._id,
        name: savedMember.name,
        email: savedMember.email,
        status: savedMember.status
      }
    });

  } catch (error) {
    console.error('Error creating member:', error);
    
    // Handle specific MongoDB errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        details: error.message
      });
    } else if (error.code === 11000) {
      return res.status(400).json({
        success: false, 
        message: 'Member with this email already exists'
      });
    } else {
      return res.status(500).json({
        success: false,
        message: 'Server error while creating member',
        details: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
      });
    }
  }
});


// @desc    Update a member
// @route   PUT /api/members/:id
// @access  Private/Admin
const updateMember = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    image,
    fatherName,
    age,
    gender,
    joinDate,
    membershipStartDate,
    membershipEndDate,
    phone,
    active,
    membershipType,
  } = req.body;

  const member = await Member.findById(req.params.id);

  if (!member) {
    res.status(404);
    throw new Error("Member not found");
  }

  // Update basic fields
  member.name = name || member.name;
  member.email = email || member.email;
  member.image = image || member.image;
  member.fatherName = fatherName || member.fatherName;
  member.age = age || member.age;
  member.gender = gender || member.gender;
  member.phone = phone || member.phone;
  member.membershipType = membershipType || member.membershipType;

  // Set the new joinDate if available
  if (joinDate) {
    member.joinDate = new Date(joinDate);
  }

  // Set the membershipStartDate and membershipEndDate directly from the request body
  if (membershipStartDate) {
    member.membershipStartDate = new Date(membershipStartDate);
  }

  if (membershipEndDate) {
    member.membershipEndDate = new Date(membershipEndDate);
  }

  // Auto-set status based on membershipEndDate
  const now = new Date();
  member.status = now <= member.membershipEndDate ? "Active" : "Inactive";

  // Save the updated member
  const updated = await member.save();
  res.json(updated);
});




// @desc    Delete a member
// @route   DELETE /api/members/:id
// @access  Private/Admin
const deleteMember = asyncHandler(async (req, res) => {
  const member = await Member.findOne({ _id: req.params.id });
  if (member) {
    await Member.deleteOne({ _id: member._id });
    res.json({ message: "Member removed" });
  } else {
    res.status(404);
    throw new Error("Member not found");
  }
});

export {
  getMembers,
  getMemberById,
  createMember,
  updateMember,
  deleteMember,
};
