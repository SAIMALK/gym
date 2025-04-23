// models/Fingerprint.js
import mongoose from 'mongoose';

const fingerprintSchema = new mongoose.Schema({
  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member',
    required: true,
    unique: true, // ensures one fingerprint per member
  },
  fingerprintId: {
    type: Number,
    required: true,
    unique: true, // optional but recommended to avoid duplicate IDs
  },
  registeredAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Fingerprint', fingerprintSchema);
