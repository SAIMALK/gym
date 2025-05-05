import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import memberRoutes from './routes/memberRoutes.js';
// import attendanceRoutes from './routes/attendanceRoutes.js';
import authRoute from "./routes/authRoute.js"
import dotenv from 'dotenv';
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from './config/db.js';
dotenv.config();
const app = express();
app.use(express.json());
const port = process.env.PORT || 5000;

connectDB();

app.use(cors({
  origin: ['http://localhost:5173','https://bodyfuel.netlify.app'], // frontend origin
  
  credentials: true,
}));

// mongoose.connect('mongodb://127.0.0.1:27017/gym_attendance3');

app.use('/api/members', memberRoutes);
// app.use('/api/attendance', attendanceRoutes);
app.use("/api/auth", authRoute);
app.get('/', (req, res) => {
  res.send('API is running...');
});
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`)
});
