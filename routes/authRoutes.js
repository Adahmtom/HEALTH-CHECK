const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();
const nodemailer = require("nodemailer");



// User Registration
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    user = new User({ name, email, password, role });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// User Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// Protected Route Example
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// Update User Profile
router.put("/update-profile", authMiddleware, async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const user = await User.findById(req.user.id);
  
      if (!user) return res.status(404).json({ message: "User not found" });
  
      if (name) user.name = name;
      if (email) user.email = email;
      if (password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
      }
  
      await user.save();
      res.json({ message: "Profile updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server Error", error });
    }
  });

// Protected Route: Only Admins Can Access
router.get("/admin", authMiddleware, roleMiddleware(["admin"]), (req, res) => {
    res.json({ message: "Welcome Admin!" });
  })

// Request Password Reset
router.post("/forgot-password", async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
  
      if (!user) return res.status(404).json({ message: "User not found" });
  
      const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "15m" });
  
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
  
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "Password Reset Request",
        text: `Click the link to reset your password: http://localhost:5000/reset-password/${resetToken}`,
      };
  
      await transporter.sendMail(mailOptions);
      res.json({ message: "Reset link sent to your email" });
    } catch (error) {
      res.status(500).json({ message: "Server Error", error });
    }
  });
  
  // Reset Password
router.post("/reset-password/:token", async (req, res) => {
    try {
      const { password } = req.body;
      const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
  
      if (!user) return res.status(404).json({ message: "User not found" });
  
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
  
      await user.save();
      res.json({ message: "Password updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Invalid or expired token", error });
    }
});

module.exports = router;
