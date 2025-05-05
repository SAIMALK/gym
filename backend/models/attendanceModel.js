// attendance.model.js
import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
    MemberId: {
      type: Number, // Use integer to match the fingerprint system's member ID
      required: true,
      ref: 'Member',
    },
    Date: {
      type: Date,
      default: Date.now,
    },
    CheckIn: {
      type: Date,
      default: Date.now,
    },
  }, { timestamps: true });

  const Attendance = mongoose.model("Attendance", attendanceSchema);
export default Attendance;