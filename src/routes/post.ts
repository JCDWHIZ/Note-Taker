import express from "express";
import { AuthMiddleware } from "../Middleware/AuthMiddleware";
export const router = express.Router();
const {
  CreatePost,
  LikePost,
  DislikePost,
  CommentOnPost,
} = require("../controller/post");

router.route("/create").post(AuthMiddleware, CreatePost);
router.route("/like").post(AuthMiddleware, LikePost);
router.route("/dislike").post(AuthMiddleware, DislikePost);
router.route("/comment").post(AuthMiddleware, CommentOnPost);

module.exports = router;
