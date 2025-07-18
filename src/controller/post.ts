import { Request, Response } from "express";
import Posts from "../Models/Posts";

export const CreatePost = async (req: any, res: Response) => {
  const { caption, media } = req.body;
  const post = await Posts.create({
    caption,
    media,
    userId: req.user.id,
  });
  res.status(201).json({
    message: "Post created successfully",
    data: post,
  });
};
