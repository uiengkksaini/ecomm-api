// controllers/loginController.js
const User = require('../models/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Importing JWT library

// Secret key for JWT (should be stored in environment variables for security)
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';  

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create a JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email }, 
      JWT_SECRET, 
      { expiresIn: '1h' } 
    );

    // Respond with user details and JWT token
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
      },
      token: token, 
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: "An error occurred while logging in" });
  }
};

module.exports = { loginUser };
