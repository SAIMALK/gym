// import mongoose from 'mongoose';

// const attendanceSchema = new mongoose.Schema({
//   memberId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Member',
//   },
//   checkInTime: {
//     type: Date,
//     default: Date.now,
//   },
//   checkOutTime: Date,
//   date: {
//     type: Date,
//     default: () => new Date().toDateString(), // only store date portion
//   },
// });

// export default mongoose.model('Attendance', attendanceSchema);
import mongoose from "mongoose";

const attendanceSchema = mongoose.Schema({
  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

const Attendance = mongoose.model("Attendance", attendanceSchema);
export default Attendance;
