import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs"
import dotenv from 'dotenv';
import jwt from "jsonwebtoken";

dotenv.config()


const authUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ msg: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
  res.json({ token });
 
});



export {
  authUser,
  // logoutUser,
};
