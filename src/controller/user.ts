import { Request, Response } from "express";
import Users from "../Models/User";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
require("dotenv").config();

const jwtSecret = process.env.JWT_SECRET;

export const register = async (req: Request, res: Response) => {
  const {
    username,
    email,
    password,
    age,
    Gender,
    dateOfBirth,
    profilePic,
    bio,
  } = req.body;

  const user = await Users.create({
    username,
    email,
    password,
    age,
    Gender,
    dateOfBirth,
    profilePic,
    bio,
  });

  // use nodemailer to send mail to the user
  res.send({
    message: "User registered successfully",
    data: {
      username: user.username,
      email: user.email,
      password: user.password,
    },
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await Users.findOne({ email });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  if (!process.env.CRYPTO_SECRET) return false;
  const decryptedPassword = CryptoJS.AES.decrypt(
    user.password,
    process.env.CRYPTO_SECRET
  ).toString(CryptoJS.enc.Utf8);
  if (decryptedPassword !== password) {
    return res.status(400).json({ message: "Invalid Credentials!" });
  }

  if (!jwtSecret) {
    return res.status(500).json({
      message: "JWT_SECRET is not defined",
    });
  } else {
    const accessToken = jwt.sign(
      { id: user._id, username: user.username, gender: user.Gender },
      jwtSecret,
      { expiresIn: "1d" }
    );
    res.status(200).json({
      message: "Login successful",
      accessToken,
    });
  }
};
