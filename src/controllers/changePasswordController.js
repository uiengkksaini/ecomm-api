const User = require("../models/userSchema");
const bcrypt = require("bcrypt");

// Change Password
const changePassword = async (req, res) => {
  const { currentPassword, newPassword, confirmNewPassword } = req.body;

  // Ensure all required fields are provided
  if (!currentPassword || !newPassword || !confirmNewPassword) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check if new passwords match
  if (newPassword !== confirmNewPassword) {
    return res.status(400).json({ message: "New passwords do not match" });
  }

  try {
    // Find the user in the database
    const user = await User.findById(req.user.userId); // Assuming user ID is available in `req.user`

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify the current password
    const isPasswordMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update the password in the database
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    res
      .status(500)
      .json({ message: "An error occurred while changing the password" });
  }
};

module.exports = { changePassword };
