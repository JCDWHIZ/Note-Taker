import express from "express";
import { AuthMiddleware } from "../Middleware/AuthMiddleware";
export const router = express.Router();
const { CreatePost } = require("../controller/post");

router.route("/create").post(AuthMiddleware, CreatePost);

module.exports = router;
