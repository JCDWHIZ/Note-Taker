import express from "express";
const { login, register } = require("../controller/user");
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);

module.exports = router;
