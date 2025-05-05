// models/Member.js
import mongoose from "mongoose";
import Counter from "./counterModel.js"; // Import the Counter model

// Function to get the next sequence value
async function getNextSequenceValue(collectionName) {
  const counter = await Counter.findById(collectionName);
  if (!counter) {
    // If no counter exists for the collection, create one
    const newCounter = new Counter({
      _id: collectionName,
      seq: 1,
    });
    await newCounter.save();
    return 1; // Return the starting ID
  }

  // Increment the counter value and return it
  counter.seq += 1;
  await counter.save();
  return counter.seq;
}

const memberSchema = new mongoose.Schema({
  _id: { type: Number }, // Use a simple integer ID instead of ObjectId
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  image: { type: String },
  age: { type: Number },
  fatherName: { type: String },
  membershipType: {
    type: String,
    enum: ["Daily", "Monthly", "Yearly"],
    required: true,
  },
  joinDate: {
    type: Date,
    default: Date.now,
  },
  membershipStartDate: { type: Date, required: true },
  membershipEndDate: { type: Date, required: true },
  active: { type: Boolean, default: true }, // Boolean active status
});

// Pre-save hook to set the _id to the next available ID
memberSchema.pre("save", async function (next) {
  if (!this._id) {
    const nextId = await getNextSequenceValue("members"); // Get next ID from the counter
    this._id = nextId; // Assign the next available ID
  }
  next();
});

const Member = mongoose.model("Member", memberSchema);
export default Member;
