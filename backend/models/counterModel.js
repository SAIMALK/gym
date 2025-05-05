// models/Counter.js
import mongoose from "mongoose";

// Counter schema to store the latest sequence
const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // The name of the collection (e.g., "members")
  seq: { type: Number, default: 0 }, // The counter sequence
});

const Counter = mongoose.model("Counter", counterSchema);
export default Counter;
