const express = require("express");
const { registerUser, loginUser, finUser, getUser } = require("../Controllers/userController");
const router = express.Router();
const userModel = require("../Models/userModel");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/find/:userId", finUser);
router.get("/", getUser);
module.exports = router;
