const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendOTPEmail } = require('../config/emailService');

const otpStore = {};
const signupOtpStore = {};
const changeEmailOtpStore = {};

const register = async (req, res) => {
  try {
    const { fullname, email, password, confirmPassword, terms } = req.body;

    if (!fullname || !email || !password || !confirmPassword || !terms) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: 'Please enter a valid email address' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    const userEmail = email.toLowerCase().trim();

    const existingUser = await User.findOne({ email: userEmail });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedPassword = await bcrypt.hash(password, 10);

    signupOtpStore[userEmail] = {
      fullname,
      email: userEmail,
      password: hashedPassword,
      terms,
      otp,
      expiresAt: Date.now() + 10 * 60 * 1000
    };

    try {
      await sendOTPEmail(userEmail, otp);
    } catch (err) {
      delete signupOtpStore[userEmail];
      return res.status(400).json({
        message: 'We couldn’t send a verification code to this email address. Please check that your email address is correct and try again.'
      });
    }

    res.status(200).json({
      message: 'Verification code sent! Please check your inbox or spam folder.',
      email: userEmail
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const verifySignupOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const userEmail = email.toLowerCase().trim();
    const data = signupOtpStore[userEmail];

    if (!data) {
      return res.status(400).json({ message: 'OTP not found' });
    }

    if (Date.now() > data.expiresAt) {
      delete signupOtpStore[userEmail];
      return res.status(400).json({
        message: 'This verification code has expired. Please request a new code.'
      });
    }

    if (data.otp !== otp) {
      return res.status(400).json({
        message: 'Invalid verification code. Please check the code in your email and try again.'
      });
    }

    const user = await User.create({
      name: data.fullname,
      email: data.email,
      password: data.password,
      agreeToTerms: data.terms,
      isEmailVerified: true
    });

    delete signupOtpStore[userEmail];

    res.status(201).json({
      message: 'Account created and email verified successfully',
      user
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const resendSignupOTP = async (req, res) => {
  try {
    const userEmail = req.body.email.toLowerCase().trim();
    const data = signupOtpStore[userEmail];

    if (!data) {
      return res.status(400).json({
        message: 'Signup session expired. Please sign up again.'
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    data.otp = otp;
    data.expiresAt = Date.now() + 10 * 60 * 1000;

    await sendOTPEmail(userEmail, otp);

    res.status(200).json({
      message: 'A new verification code has been sent to your email.'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password, remember } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please enter both email and password' });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });

    if (!user) {
      return res.status(401).json({ message: 'Please enter the correct email' });
    }

    if (!user.isEmailVerified) {
      return res.status(401).json({ message: 'Please verify your email first' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Please enter the correct password' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: remember ? '30d' : '7d' }
    );

    res.status(200).json({
      message: 'Login successful!',
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
    res.status(500).json({ message: 'Server error' });
  }
};

const logout = (req, res) => {
  res.status(200).json({ message: 'Logout successful!' });
};

const forgotPassword = async (req, res) => {
  try {
    if (!req.body.email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const userEmail = req.body.email.toLowerCase().trim();

    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    otpStore[userEmail] = {
      otp,
      expiresAt: Date.now() + 10 * 60 * 1000
    };

    await sendOTPEmail(userEmail, otp);

    res.status(200).json({ message: 'OTP sent to your email', email: userEmail });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: 'Email and OTP are required' });
    }

    const userEmail = email.toLowerCase().trim();
    const stored = otpStore[userEmail];

    if (!stored) {
      return res.status(400).json({ message: 'OTP not found' });
    }

    if (Date.now() > stored.expiresAt) {
      delete otpStore[userEmail];
      return res.status(400).json({ message: 'OTP expired' });
    }

    if (stored.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    delete otpStore[userEmail];

    res.status(200).json({ message: 'OTP verified successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({ message: 'Email and new password are required' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const sendChangeEmailOTP = async (req, res) => {
  try {
    const { currentEmail, newEmail } = req.body;

    if (!currentEmail || !newEmail) {
      return res.status(400).json({ message: 'Current email and new email are required' });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) {
      return res.status(400).json({ message: 'Please enter a valid new email address' });
    }

    const oldEmail = currentEmail.toLowerCase().trim();
    const updatedEmail = newEmail.toLowerCase().trim();

    if (oldEmail === updatedEmail) {
      return res.status(400).json({ message: 'New email cannot be the same as current email' });
    }

    const user = await User.findOne({ email: oldEmail });
    if (!user) {
      return res.status(404).json({ message: 'Current user not found' });
    }

    const emailTaken = await User.findOne({ email: updatedEmail });
    if (emailTaken) {
      return res.status(400).json({ message: 'This new email is already registered' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    changeEmailOtpStore[oldEmail] = {
      newEmail: updatedEmail,
      otp,
      expiresAt: Date.now() + 10 * 60 * 1000
    };

    await sendOTPEmail(updatedEmail, otp);

    res.status(200).json({ message: 'Verification code sent to your new email' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const verifyAndUpdateEmail = async (req, res) => {
  try {
    const { currentEmail, otp } = req.body;

    if (!currentEmail || !otp) {
      return res.status(400).json({ message: 'Current email and OTP are required' });
    }

    const oldEmail = currentEmail.toLowerCase().trim();
    const stored = changeEmailOtpStore[oldEmail];

    if (!stored) {
      return res.status(400).json({ message: 'OTP session expired. Please request again.' });
    }

    if (Date.now() > stored.expiresAt) {
      delete changeEmailOtpStore[oldEmail];
      return res.status(400).json({ message: 'OTP has expired' });
    }

    if (stored.otp !== otp) {
      return res.status(400).json({ message: 'Invalid verification code' });
    }

    const user = await User.findOne({ email: oldEmail });
    if (!user) {
      delete changeEmailOtpStore[oldEmail];
      return res.status(404).json({ message: 'User not found' });
    }

    user.email = stored.newEmail;
    await user.save();

    delete changeEmailOtpStore[oldEmail];

    res.status(200).json({
      message: 'Email updated successfully!',
      newEmail: user.email
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  register,
  verifySignupOTP,
  resendSignupOTP,
  login,
  logout,
  forgotPassword,
  verifyOTP,
  resetPassword,
  sendChangeEmailOTP,
  verifyAndUpdateEmail
};