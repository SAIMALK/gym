
import express from "express";
const router = express.Router();
import { getAttendanceByDate, getAttendance } from "../controllers/attendanceController.js";


router.route("/")
  .get( getAttendanceByDate)
  router.route("/getAttendance")
  .get( getAttendance)

export default router;
