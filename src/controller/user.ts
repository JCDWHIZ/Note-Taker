import { Request, Response } from "express";
import Users from "../Models/User";

export const register = async (req: Request, res: Response) => {
  const { username, email, password, age, Gender, dateOfBirth, profilePic } =
    req.body;

  const user = await Users.create({
    username,
    email,
    password,
    age,
    Gender,
    dateOfBirth,
    profilePic,
  });

  return res.send({
    message: "User registered successfully",
    data: {
      username: user.username,
      email: user.email,
      password: user.password,
    },
  });
};

export const login = (req: Request, res: Response) => {
  // Login logic goes here
  console.log("User login logic executed.");

  res.send({
    message: "User logged in successfully",
    data: { email: req.body.email, password: req.body.password },
  });
};
