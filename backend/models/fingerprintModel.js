// fingerprint_model.js
import mongoose from "mongoose";

const fingerprintSchema = new mongoose.Schema({
    Member: {
      type: Number, // Use integer to match the fingerprint system's member ID
      required: true,
      ref: 'Member',
    },
    TemplateData: {
      type: Buffer,
      
    },
    CreatedAt: {
      type: Date,
      default: Date.now,
    },
  }, { timestamps: true });

  const Fingerprint = mongoose.model("Fingerprint", fingerprintSchema);
export default Fingerprint;