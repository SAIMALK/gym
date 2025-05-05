// // import express from 'express';
// // import Attendance from '../models/attendanceModel.js';

// // const router = express.Router();

// // router.post('/checkin', async (req, res) => {
// //   const { attendenceId } = req.body;
// //   const attendance = new Attendance({ attendenceId });
// //   await attendance.save();
// //   res.json(attendance);
// // });

// // router.post('/checkout', async (req, res) => {
// //   const { attendanceId } = req.body;
// //   const record = await Attendance.findById(attendanceId);
// //   record.checkOutTime = new Date();
// //   await record.save();
// //   res.json(record);
// // });

// // router.get('/', async (req, res) => {
// //   const records = await Attendance.find().populate('attendenceId');
// //   res.json(records);
// // });

// // export default router;

// import express from "express";
// const router = express.Router();
// import { handleAttendance, getAttendance } from "../controllers/attendanceController.js";


// router.route("/")
//   .post( handleAttendance)
//   .get( getAttendance);

// export default router;
