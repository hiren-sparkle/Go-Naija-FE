const authMiddleware=require('../middlewares/authMiddleware')
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const sendEmail = require('../config/mailer');
require('dotenv').config();

const router = express.Router();
router.get("/protected", authMiddleware, (req, res) => {
  res.json({ message: "You accessed a protected route!", userId: req.userId });
});
// ✅ Signup Route
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate verification token
    const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Create user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      verificationToken,
      verified: false,
    });

    await newUser.save();

    // Send verification email (with username and email)
    const verificationLink = `http://localhost:5001/api/auth/verify/${verificationToken}`;
    const emailContent = `
      <p>Dear ${name},</p>
      <p>Thank you for registering at ${process.env.WEBSITE_NAME}! Your account has been successfully created.</p>
      <p><strong>Username:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p>To get started, please click the link below to verify your email and activate your account:</p>
      <p><a href="${verificationLink}">🔗 Verify My Email</a></p>
      <p>If you did not create this account, please ignore this email or contact our support team at <a href="mailto:${process.env.SUPPORT_EMAIL}">${process.env.SUPPORT_EMAIL}</a>.</p>
      <p>Best Regards,<br />The ${process.env.WEBSITE_NAME} Team</p>
    `;
    await sendEmail(email, 'Verify Your Email', emailContent);

    res.status(201).json({ message: 'User registered. Please verify your email.' });
  } catch (err) {
    console.error("Error signing up:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


// ✅ Email Verification Route
router.get('/verify/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      return res.redirect(`http://localhost:8080/verify-email?status=failed`);
    }

    user.verified = true;
    user.verificationToken = null;
    await user.save();

    return res.redirect(`http://localhost:8080/verify-email?status=success`);

  } catch (err) {
    return res.redirect(`http://localhost:8080/verify-email?status=expired`);
  }
});


  
// ✅ Login Route
router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      // Check if user is verified
      if (!user.verified) {
        return res.status(400).json({ message: 'Please verify your email before logging in' });
      }
  
      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid password' });
      }
  
      // Generate JWT token
      const token = jwt.sign(
        { userId: user._id }, 
        process.env.JWT_SECRET, 
        { expiresIn: "7d", algorithm: "HS256" } // 🔥 Ensure correct algorithm
      );
        
      res.status(200).json({ message: 'Login successful', token, user: { name: user.name, email: user.email } });
  
    } catch (err) {
      console.error('❌ Login error:', err);
      res.status(500).json({ message: 'Server error' });
    }
  });

  router.put('/update', authMiddleware, async (req, res) => {
    try {
      const userId = req.user.userId;
      const { name, email } = req.body;
  
      console.log("🔍 Incoming Update Request:", { userId, name, email });
  
      // Check if the user exists before updating
      const existingUser = await User.findById(userId);
      console.log("✅ Existing User:", existingUser);
  
      if (!existingUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Update user
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { name, email },
        { new: true, runValidators: true }
      );
  
      console.log("🆕 Updated User:", updatedUser);
  
      res.json(updatedUser);
    } catch (err) {
      console.error('❌ Update Error:', err);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  router.put("/change-password", authMiddleware, async (req, res) => {
    try {
      const userId = req.user.userId; // Get from authMiddleware
      const { oldPassword, newPassword } = req.body;
  
      const user = await User.findById(userId).select("+password"); // Ensure password is included
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      if (!user.password) {
        return res.status(500).json({ message: "Password field is missing in DB" });
      }
  
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Old password is incorrect" });
      }
  
      user.password = await bcrypt.hash(newPassword, 10);
      await user.save();
  
      res.json({ message: "Password changed successfully" });
    } catch (err) {
      console.error("Change password error:", err);
      res.status(500).json({ message: "Server error" });
    }
  });
  
  router.delete('/delete', authMiddleware, async (req, res) => {
    try {
      const userId = req.user.userId;
  
      // Check if user exists
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Delete user from database
      await User.findByIdAndDelete(userId);
  
      res.status(200).json({ message: "Account deleted successfully" });
    } catch (err) {
      console.error("❌ Error deleting account:", err);
      res.status(500).json({ message: "Server error", error: err.message });
    }
  });
  
    
  
  export default router;
