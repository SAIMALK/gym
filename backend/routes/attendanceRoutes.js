
import express from "express";
const router = express.Router();
import { getAttendanceByDate } from "../controllers/attendanceController.js";


router.route("/")
  .get( getAttendanceByDate)

export default router;
