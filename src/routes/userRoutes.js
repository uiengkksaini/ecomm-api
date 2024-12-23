const express = require("express");
const { registerUser } = require("../controllers/userController");
const { loginUser } = require("../controllers/loginController");
const { forgotPassword } = require("../controllers/forgotController");
const { resetPassword } = require("../controllers/resetController");
const { updateProfile } = require("../controllers/updateProfileController");
const { changePassword } = require("../controllers/changePasswordController");
const { verifyToken } = require("../middlewares/authMiddlewares");
const router = express.Router();

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     description: This endpoint allows users to register by providing necessary details.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *               mobile:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully registered the user.
 *       400:
 *         description: Invalid request data.
 */
router.post("/register", registerUser);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     description: This endpoint allows users to login with their credentials.
 *     tags: [Users]
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful.
 *       400:
 *         description: Invalid credentials.
 */
router.post("/login", loginUser);

/**
 * @swagger
 * /change-password:
 *   post:
 *     summary: Change user password
 *     description: Allows an authenticated user to change their password by providing the current and new passwords.
 *     tags: [Users]
 *
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 description: The user's current password
 *               newPassword:
 *                 type: string
 *                 description: The user's new password
 *               confirmNewPassword:
 *                 type: string
 *                 description: Confirmation of the new password
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       400:
 *         description: Bad request, invalid passwords or validation errors
 *       401:
 *         description: Unauthorized, authentication required
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.post("/change-password", verifyToken, changePassword);

/**
 * @swagger
 * /forgot-password:
 *   post:
 *     summary: Request password reset
 *     description: This endpoint allows users to request a password reset link via email.
 *     tags: [Users]
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset email sent successfully.
 *       400:
 *         description: User not found.
 */
router.post("/forgot-password", forgotPassword);

/**
 * @swagger
 * /reset-password:
 *   post:
 *     summary: Reset password
 *     description: This endpoint allows users to reset their password using a valid reset token.
 *     tags: [Users]
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               resetToken:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset successful.
 *       400:
 *         description: Invalid or expired token.
 */
router.post("/reset-password", resetPassword);

/**
 * @swagger
 * /update-profile:
 *   put:
 *     summary: Update user profile
 *     description: Allows a logged-in user to update their bio, profile picture, and social media links.
 *     tags: [Users]
 *
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bio:
 *                 type: string
 *                 description: User's bio
 *               profilePic:
 *                 type: string
 *                 description: URL or file path for the profile picture
 *               socialMediaLinks:
 *                 type: object
 *                 properties:
 *                   facebook:
 *                     type: string
 *                   twitter:
 *                     type: string
 *                   instagram:
 *                     type: string
 *                   linkedin:
 *                     type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       401:
 *         description: Unauthorized, authentication required
 *       400:
 *         description: Bad request, missing required fields
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.put("/update-profile", verifyToken, updateProfile);

module.exports = router;
