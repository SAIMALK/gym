
import express from "express";
const router = express.Router();
import { getFingerprint } from "../controllers/fingerprintController.js";


router.route("/")
  .get( getFingerprint)

export default router;
