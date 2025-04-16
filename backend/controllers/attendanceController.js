import Attendance from "../models/attendanceModel.js";
import Member from "../models/memberModel.js";

// @desc    Mark attendance
// @route   POST /api/attendance
// @access  Private
 const markAttendance = async (req, res) => {
  const { memberId, date } = req.body;

  if (!memberId) {
    return res.status(400).json({ message: "Member ID is required" });
  }

  const member = await Member.findById(memberId);
  if (!member) {
    return res.status(404).json({ message: "Member not found" });
  }

  // Check if attendance already exists for this member on this date
  const existing = await Attendance.findOne({
    member: memberId,
    date: {
      $gte: new Date(new Date(date || Date.now()).setHours(0, 0, 0, 0)),
      $lte: new Date(new Date(date || Date.now()).setHours(23, 59, 59, 999)),
    },
  });

  if (existing) {
    return res.status(400).json({ message: "Attendance already marked for today" });
  }

  const attendance = new Attendance({
    member: memberId,
    date: date || Date.now(),
  });

  const saved = await attendance.save();
  res.status(201).json(saved);
};

// @desc    Get attendance records
// @route   GET /api/attendance
// @access  Private
 const getAttendance = async (req, res) => {
  const attendance = await Attendance.find().populate("member", "name email");
  res.json(attendance);
};

export{
markAttendance,
getAttendance,
};