const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendOTPEmail } = require('../config/emailService');
const otpStore = {};

const loginAdmin = async (req, res) => {
  try {
    const { email, password, remember } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Please enter both email and password' });
    }
    if (email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({ message: 'Admin access only' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Admin account not found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }
    const expiresIn = remember ? '30d' : '7d';
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn });
    res.status(200).json({
      message: 'Admin login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        language: user.language
      }
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const forgotPasswordAdmin = async (req, res) => {
  try {
    const email = process.env.ADMIN_EMAIL;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Admin account not found' });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[email] = { otp, expiresAt: Date.now() + 10 * 60 * 1000 };
    await sendOTPEmail(email, otp);
    res.status(200).json({ message: 'OTP sent to admin email', email });
  } catch (error) {
    console.error('Admin forgotPassword error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const verifyOTPAdmin = async (req, res) => {
  try {
    const { otp } = req.body;
    if (!otp) {
      return res.status(400).json({ message: 'OTP is required' });
    }
    const email = process.env.ADMIN_EMAIL;
    const stored = otpStore[email];
    if (!stored) {
      return res.status(400).json({ message: 'OTP not found' });
    }
    if (Date.now() > stored.expiresAt) {
      delete otpStore[email];
      return res.status(400).json({ message: 'OTP expired' });
    }
    if (stored.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }
    delete otpStore[email];
    res.status(200).json({ message: 'OTP verified successfully', email });
  } catch (error) {
    console.error('Admin verifyOTP error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const resetPasswordAdmin = async (req, res) => {
  try {
    const { newPassword } = req.body;
    if (!newPassword) {
      return res.status(400).json({ message: 'New password is required' });
    }
    const email = process.env.ADMIN_EMAIL;
    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Admin account not found' });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Admin resetPassword error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  loginAdmin,
  forgotPasswordAdmin,
  verifyOTPAdmin,
  resetPasswordAdmin
};