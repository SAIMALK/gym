// import Attendance from "../models/attendanceModel.js";
// import Member from "../models/memberModel.js";
// import Fingerprint from "../models/fingerprintModel.js";

// // @desc    Handle check-in/check-out via fingerprint
// // @route   POST /api/attendance
// // @access  Private
// const handleAttendance = async (req, res) => {
//   try {
//     const { fingerprintId } = req.body;
    
//     if (!fingerprintId) {
//       return res.status(400).json({ message: "Fingerprint ID is required" });
//     }

//     // Get member from fingerprint
//     const fingerprint = await Fingerprint.findOne({ fingerprintId })
//       .populate('member');
    
//     if (!fingerprint || !fingerprint.member) {
//       return res.status(404).json({ message: "Fingerprint not registered" });
//     }

//     const member = fingerprint.member;
    
//     // Get today's attendance record
//     const todayStart = new Date().setHours(0, 0, 0, 0);
//     const todayEnd = new Date().setHours(23, 59, 59, 999);
    
//     let attendance = await Attendance.findOne({
//       member: member._id,
//       date: { $gte: todayStart, $lte: todayEnd }
//     });

//     if (!attendance) {
//       // Check in
//       attendance = new Attendance({
//         member: member._id,
//         checkInTime: Date.now(),
//         date: Date.now()
//       });
//       await attendance.save();
//       return res.status(201).json({
//         action: 'checked-in',
//         attendance,
//         member: {
//           name: member.name,
//           membershipType: member.membershipType
//         }
//       });
//     } else if (!attendance.checkOutTime) {
//       // Check out
//       attendance.checkOutTime = Date.now();
//       await attendance.save();
//       return res.status(200).json({
//         action: 'checked-out',
//         attendance,
//         member: {
//           name: member.name,
//           membershipType: member.membershipType
//         }
//       });
//     }

//     return res.status(400).json({ message: "Attendance already completed for today" });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// // @desc    Get attendance records with filters
// // @route   GET /api/attendance
// // @access  Private
// const getAttendance = async (req, res) => {
//   try {
//     const { startDate, endDate, memberId } = req.query;
//     const filter = {};

//     if (startDate && endDate) {
//       filter.date = {
//         $gte: new Date(startDate),
//         $lte: new Date(endDate)
//       };
//     }

//     if (memberId) {
//       filter.member = memberId;
//     }

//     const attendance = await Attendance.find(filter)
//       .populate("member", "name email membershipType")
//       .sort({ date: -1 });

//     res.json(attendance);
    
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// export { handleAttendance, getAttendance };