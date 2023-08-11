import express from "express";
import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";
import { userModel } from "../models/user.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (user) {
    return res.status(400).json({ message: "User already exists" });
  }

  const newUser = new userModel({ name, email, password });
  await newUser.save();
  res.json({ message: "User created " });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: "User doesn't exist" });
  }

  if (user.password !== password) {
    return res.status(401).json({ message: "name doesn't exists" });
  }

  const token = jwt.sign({ id: user._id }, "secret");
  res.json({ token, userId: user._id });
});

export { router as userRouter };
