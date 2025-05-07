import asyncHandler from "../middleware/asyncHandler.js";
import Fingerprint from "../models/fingerprintModel.js";

const getFingerprint = asyncHandler(async (req, res) => {

    const count = await Fingerprint.countDocuments();
    res.json(count);
  });

  export { getFingerprint};