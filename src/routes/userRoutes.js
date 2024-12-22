// routes/userRoutes.js
const express = require("express");
const { registerUser } = require("../controllers/userController");
const { loginUser } = require("../controllers/loginController");
const { forgotPassword } = require("../controllers/forgotController");
const { resetPassword } = require("../controllers/resetController");
const router = express.Router();

// Register route
router.post("/register", registerUser);

// Login route
router.post("/login", loginUser); // Login route

// Forgot Password route
router.post("/forgot-password", forgotPassword);

// Reset Password route
router.post("/reset-password", resetPassword);

module.exports = router;
