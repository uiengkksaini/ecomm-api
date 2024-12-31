// controllers/userController.js
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const User = require("../models/userSchema");

// Create a Nodemailer transporter to send emails
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "frontenddev.life@gmail.com",
    pass: "atdp vubd pzbq hola",
  },
});

// Forgot Password function
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    // Check if the user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Generate a password reset token
    const resetToken = crypto.randomBytes(20).toString("hex"); // Secure random token
    const resetTokenExpiry = Date.now() + 3600000; // Token expires in 1 hour

    // Store the token and expiry in the user's record
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiry = resetTokenExpiry;
    await user.save();

    // Send the password reset token to the user's email
    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

    const mailOptions = {
      from: "frontenddev.life@gmail.com",
      to: email,
      subject: "Password Reset Request",
      text: `You requested a password reset. Please click the link below to reset your password:\n\n${resetUrl}`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Password reset email sent!" });
  } catch (error) {
    console.error("Error in forgot password:", error);
    res
      .status(500)
      .json({ message: "An error occurred, please try again later" });
  }
};

module.exports = { forgotPassword };
