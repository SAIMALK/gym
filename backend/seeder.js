import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/userModel.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const seedAdmin = async () => {
  const username = 'admin';
  const password = 'admin123'; // change this to something secure
  const hashedPassword = await bcrypt.hash(password, 10);

  const existing = await User.findOne({ username });
  if (existing) {
    console.log('Admin already exists.');
  } else {
    await User.create({ username, password: hashedPassword });
    console.log('Admin created.');
  }

  mongoose.disconnect();
};

seedAdmin();