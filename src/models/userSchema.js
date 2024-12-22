const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobile: { type: String, required: true },
    resetPasswordToken: String, // Field to store the reset token
    resetPasswordExpiry: Date, // Field to store the expiry of the token
    bio: { type: String, default: "" }, // new field for Bio
    profilePic: { type: String, default: "" },
    socialMediaLinks: {
      facebook: { type: String, default: "" },
      twitter: { type: String, default: "" },
      instagram: { type: String, default: "" },
      linkedin: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
