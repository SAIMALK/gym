
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
const createMember = asyncHandler(async (req, res) => {
  // Get the next ID for the member
  const nextId = await getNextSequenceValue("members");

  // Create the new member with the auto-incremented ID
  const member = new Member({
    _id: nextId,  // Set the custom integer _id
    ...req.body,  // Spread the rest of the member data from the request body
  });

  // Save the member
  await member.save();

  // Respond with the newly created member
  res.status(201).json(member);
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
