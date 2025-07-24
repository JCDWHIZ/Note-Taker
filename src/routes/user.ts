import express from "express";
const {
  GetUserDetails,
  FollowUser,
  UnFollowUser,
} = require("../controller/user");
const router = express.Router();
import { AuthMiddleware } from "../Middleware/AuthMiddleware";

router.route("/:Id").get(AuthMiddleware, GetUserDetails);

router.route("/follow/:Id").put(AuthMiddleware, FollowUser);

router.route("/unfollow/:Id").put(AuthMiddleware, UnFollowUser);

module.exports = router;
