import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({
  name: String,
  email: String,
  image: String,
  fatherName: String,
  phone: String,
  membershipType: String,
  age: Number,
  gender: String,
  joinDate: {
    type: Date,
    default: Date.now,
  },
  fingerprintId: {
    type: Number,
    default: null, // leave empty for now
  },
});

export default mongoose.model('Member', memberSchema);
