// models/Member.js
import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  gender: String,
  image: String,
  membershipType: {
    type: String,
    enum: ["Monthly", "Quarterly", "HalfYearly", "Yearly"],
  },
  membershipStartDate: { type: Date, required: true },
  membershipEndDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ["Active", "Inactive"],
    default: "Inactive",
  },
});

const Member = mongoose.model("Member", memberSchema);
export default Member;
