
import asyncHandler from "../middleware/asyncHandler.js";
import Member from "../models/memberModel.js";

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
  const member = await Member.findById(req.params.id);

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
  const member = new Member(req.body);
  await member.save();
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
    membershipStartDate,
    phone,
    membershipType,
  } = req.body;

  const member = await Member.findById(req.params.id);

  if (!member) {
    res.status(404);
    throw new Error("Member not found");
  }

  // Update basic fields
  member.name = name;
  member.email = email;
  member.image = image;
  member.gender = gender;
  member.phone = phone;
  member.membershipType = membershipType;

  // Set the new membershipStartDate
  const startDate = new Date(membershipStartDate);
  member.membershipStartDate = startDate;

  // Calculate membershipEndDate based on membershipType
  let endDate;
  const durationMap = {
    Daily: 1,
    Monthly: 1,
    Quarterly: 3,
    HalfYearly: 6,
    Yearly: 12,
  };

  const duration = durationMap[membershipType] || 1;

  if (membershipType === "Daily") {
    // Add days for daily membership
    endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + duration);
  } else {
    // Add months for other membership types
    endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + duration);
  }

  member.membershipEndDate = endDate;

  // Auto-set status based on membershipEndDate
  const now = new Date();
  member.status = now <= endDate ? "Active" : "Inactive";

  const updated = await member.save();
  res.json(updated);
});



// @desc    Delete a member
// @route   DELETE /api/members/:id
// @access  Private/Admin
const deleteMember = asyncHandler(async (req, res) => {
  const member = await Member.findById(req.params.id);

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
