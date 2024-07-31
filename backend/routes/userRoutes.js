require("dotenv").config();
const express = require('express');
const router = express.Router();
const { createUser,deleteUser, loginUser, getUsers, getProfile, sendOtp, verifyOtp } = require('../controllers/userController');
const varifyToken = require("../middlewares/varifyToken");
const varifyAdmin=require("../middlewares/varifyAdmin");
// Create user
router.post("/create", createUser);

//Delete user
router.delete("/:id",varifyAdmin, deleteUser);

// Login user
router.post("/login", loginUser);

// Get all users
router.get('/',varifyAdmin, getUsers);

// Get user profile
router.get('/profile', getProfile);

// Send OTP
router.post('/otp', varifyToken, sendOtp);

// Verify OTP
router.post('/verify', varifyToken, verifyOtp);

module.exports = router;
