import { Request, Response } from "express";
import Posts from "../Models/Posts";
import Comments from "../Models/Comments";

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

export const LikePost = async (req: Request, res: Response) => {
  const postId = req.params.Id;

  const post = await Posts.findById(postId);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  post.likes += 1;
  await post.save();

  return res.status(200).json({ message: "Like added", likes: post.likes });
};

export const DislikePost = async (req: Request, res: Response) => {
  const postId = req.params.Id;

  const post = await Posts.findById(postId);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  post.dislikes += 1;
  await post.save();

  return res
    .status(200)
    .json({ message: "Dislike added", dislikes: post.dislikes });
};

export const CommentOnPost = async (req: any, res: Response) => {
  const postId = req.params.Id;
  const { caption, media } = req.body;

  const post = await Posts.findById(postId);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  const comment = await Comments.create({
    caption,
    media,
    user: req.user.id,
  });

  post.comments.push(comment.id);
  await post.save();

  const updatedPost = await Posts.findById(postId).populate("comments");

  return res.status(200).json({ message: "Comment added", data: updatedPost });
};
