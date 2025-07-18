import { NextFunction, Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../Models/User";
require("dotenv").config();

interface Decoded extends jwt.JwtPayload {
  id: string;
  username: string;
}

export const AuthMiddleware: RequestHandler = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({
      success: false,
      message: "User Unauthenticated",
    });
    return;
  }

  if (!process.env.JWT_SECRET) {
    res.status(500).json({
      success: false,
      message: "JWT_SECRET is not defined",
    });
    return;
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET) as Decoded;
  console.log("decoded", decoded);
  const userId = decoded.id;
  const user = await User.findById(userId).select("-password");

  req.user = user;
  next();
};
