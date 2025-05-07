import asyncHandler from "../middleware/asyncHandler.js";
import Attendance from "../models/attendanceModel.js";
import Member from "../models/memberModel.js";

 const getAttendanceByDate = asyncHandler(async (req, res) => {
    try { 
  const { date } = req.query;
  if (!date) {
    return res.status(400).json({
      success: false,
      message: "Date parameter is required"
    });
  }
  const startDate = new Date(date);
  startDate.setHours(0, 0, 0, 0);
  const endDate = new Date(date);
  endDate.setHours(23, 59, 59, 999);


  const attendance = await Attendance.aggregate([
    {
      $match: {
        Date: { 
          $gte: startDate, 
          $lte: endDate 
        }
      }
    },
    {
      $lookup: {
        from: "members",
        localField: "MemberId",
        foreignField: "_id",  // Ensure both fields are numbers
        as: "member"
      }
    },
    {
      $unwind: {
        path: "$member",
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $project: {
        _id: 1,
        MemberId: 1,
        Date: 1,
        CheckIn: 1,
        memberName: { $ifNull: ["$member.name", "Unknown"] }
      }
    },
    { $sort: { CheckIn: -1 } }
  ]);

  console.log('Database Query Result:', attendance);  // Add this for debugging

  res.status(200).json({
    success: true,
    count: attendance.length,
    data: attendance
  });
} catch (error) {
    console.error('Error in getAttendanceByDate:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

const getAttendance = asyncHandler(async (req, res) => {
  const today = new Date();
  const startOfDay = new Date(today.setHours(0, 0, 0, 0)); // Start of today (00:00:00)
  const endOfDay = new Date(today.setHours(23, 59, 59, 999)); // End of today (23:59:59)

  try {
    // Count the attendance records for today
    const Count = await Attendance.countDocuments({
      CheckIn: { $gte: startOfDay, $lte: endOfDay }
    });

    res.status(200).json({
      success: true,
      Count,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export {
  getAttendanceByDate,
  getAttendance
}