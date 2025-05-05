// import mongoose from 'mongoose';

// // Define the fingerprint schema
// const fingerprintSchema = new mongoose.Schema({
//   // MongoDB will automatically generate ObjectId for this field (this is for the fingerprint document)
//   _id: { type: mongoose.Schema.Types.ObjectId, auto: true },

//   // Integer ID for the linked member (you manually set this to match the member's integer ID)
//   member: { 
//     type: Number,  // Integer ID for member reference
//     required: true,
//     unique: true,  // Ensure a fingerprint can only be linked to one member
//   },

//   // Store the fingerprint template data as binary data (Buffer type)
//   template: { 
//     type: Buffer,  // Store fingerprint template as binary data
//     required: true
//   },

//   // Store the creation date with UTC format (optional)
//   createdAt: { 
//     type: Date, 
//     default: Date.now,  // Auto-set the creation date if not provided
//     immutable: true     // This ensures the date cannot be updated once set
//   }
// });

// // Create and export the model for Fingerprint
// const Fingerprint = mongoose.model('Fingerprint', fingerprintSchema);

// export default Fingerprint;
