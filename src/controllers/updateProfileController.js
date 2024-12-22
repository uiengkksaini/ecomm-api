const User = require("../models/userSchema");

const updateProfileController = async (req, res) => {
  const { bio, profilePic, socialMediaLinks } = req.body;
  const userId = req.user.userId; // Getting user ID from the JWT payload

  try {
    // Find the user and update their profile
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          bio: bio || "", // Update bio if provided, else leave empty
          profilePic: profilePic || "", // Same for profilePic
          "socialMediaLinks.facebook": socialMediaLinks?.facebook || "",
          "socialMediaLinks.twitter": socialMediaLinks?.twitter || "",
          "socialMediaLinks.instagram": socialMediaLinks?.instagram || "",
          "socialMediaLinks.linkedin": socialMediaLinks?.linkedin || "",
        },
      },
      { new: true } // Return the updated user document
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the updated user data
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      bio: user.bio,
      profilePic: user.profilePic,
      socialMediaLinks: user.socialMediaLinks,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { updateProfileController };
