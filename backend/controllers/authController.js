import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs"
import dotenv from 'dotenv';
import jwt from "jsonwebtoken";

dotenv.config()


const authUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  console.log('Login attempt for:', username);
  const user = await User.findOne({ username });
  if (!user){ console.log('User not found:', username);
  return res.status(400).json({ msg: "Invalid credentials" });}
  console.log('Found user:', user);
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch){console.log('Password mismatch for:', username)
   return res.status(400).json({ msg: "Invalid credentials" });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
  res.json({ token });
 
});



export {
  authUser,
  // logoutUser,
};
