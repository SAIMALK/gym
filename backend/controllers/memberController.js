
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
  const memberAuthor = await Author.findById(member.author);

  member.author = memberAuthor;
  //   console.log(memberAuthor);
  if (member) {
    res.json(member);
  } else {
    res.status(404);
    return next(new Error("Resource not found"));
  }
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
    joinDate,
    phone,
    membershipType,
  } = req.body;

  const member = await Member.findById(req.params.id);

  if (member) {
    member.name = name;
    member.email = email;
    member.image = image;
    member.fatherName = fatherName;
    member.age = age;
    member.gender = gender;
    member.joinDate = joinDate;
    member.phone = phone;
    member.membershipType = membershipType;
    const updatedMember = await member.save();
    res.json(updatedMember);
  } else {
    res.status(404);
    throw new Error("Member not found");
  }
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
