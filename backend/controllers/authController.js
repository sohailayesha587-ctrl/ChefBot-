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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Please enter a valid email address' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedPassword = await bcrypt.hash(password, 10);

    signupOtpStore[normalizedEmail] = {
      fullname,
      email: normalizedEmail,
      password: hashedPassword,
      terms,
      otp,
      expiresAt: Date.now() + 10 * 60 * 1000
    };

    try {
      await sendOTPEmail(normalizedEmail, otp);
    } catch (emailError) {
      delete signupOtpStore[normalizedEmail];
      return res.status(400).json({
        message: 'We couldn’t send a verification code to this email address. Please check that your email address is correct and try again.'
      });
    }

    res.status(200).json({
      message: 'Verification code sent! Please check your inbox or spam folder.',
      email: normalizedEmail
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const verifySignupOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: 'Email and OTP are required' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const stored = signupOtpStore[normalizedEmail];

    if (!stored) {
      return res.status(400).json({ message: 'OTP not found' });
    }

    if (Date.now() > stored.expiresAt) {
      delete signupOtpStore[normalizedEmail];
      return res.status(400).json({ message: 'This verification code has expired. Please request a new code.' });
    }

    if (stored.otp !== otp) {
      return res.status(400).json({ message: 'Invalid verification code. Please check the code in your email and try again.' });
    }

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      delete signupOtpStore[normalizedEmail];
      return res.status(400).json({ message: 'Email already registered' });
    }

    const user = await User.create({
      name: stored.fullname,
      email: stored.email,
      password: stored.password,
      agreeToTerms: stored.terms,
      isEmailVerified: true
    });

    delete signupOtpStore[normalizedEmail];

    res.status(201).json({
      message: 'Account created and email verified successfully',
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

const resendSignupOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const stored = signupOtpStore[normalizedEmail];

    if (!stored) {
      return res.status(400).json({ message: 'Signup session expired. Please sign up again.' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    stored.otp = otp;
    stored.expiresAt = Date.now() + 10 * 60 * 1000;

    try {
      await sendOTPEmail(normalizedEmail, otp);
    } catch (emailError) {
      return res.status(400).json({ message: 'We couldn’t send a new verification code to this email address. Please check your email address and try again.' });
    }

    res.status(200).json({ message: 'A new verification code has been sent to your email.' });
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

    const user = await User.findOne({ email });

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

    const expiresIn = remember ? '30d' : '7d';
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn }
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

const logout = async (req, res) => {
  try {
    res.status(200).json({ message: 'Logout successful!' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[email] = {
      otp,
      expiresAt: Date.now() + 10 * 60 * 1000
    };

    await sendOTPEmail(email, otp);

    res.status(200).json({
      message: 'OTP sent to your email',
      email
    });
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

    return res.status(200).json({ message: 'OTP verified successfully' });
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

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      return res.status(400).json({ message: 'Please enter a valid new email address' });
    }

    const normCurrent = currentEmail.toLowerCase().trim();
    const normNew = newEmail.toLowerCase().trim();

    if (normCurrent === normNew) {
      return res.status(400).json({ message: 'New email cannot be the same as current email' });
    }

    const user = await User.findOne({ email: normCurrent });
    if (!user) {
      return res.status(404).json({ message: 'Current user not found' });
    }

    const existingNewEmail = await User.findOne({ email: normNew });
    if (existingNewEmail) {
      return res.status(400).json({ message: 'This new email is already registered' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    changeEmailOtpStore[normCurrent] = {
      newEmail: normNew,
      otp,
      expiresAt: Date.now() + 10 * 60 * 1000
    };

    await sendOTPEmail(normNew, otp);

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

    const normCurrent = currentEmail.toLowerCase().trim();
    const stored = changeEmailOtpStore[normCurrent];

    if (!stored) {
      return res.status(400).json({ message: 'OTP session expired. Please request again.' });
    }

    if (Date.now() > stored.expiresAt) {
      delete changeEmailOtpStore[normCurrent];
      return res.status(400).json({ message: 'OTP has expired' });
    }

    if (stored.otp !== otp) {
      return res.status(400).json({ message: 'Invalid verification code' });
    }

    const user = await User.findOne({ email: normCurrent });
    if (!user) {
      delete changeEmailOtpStore[normCurrent];
      return res.status(404).json({ message: 'User not found' });
    }

    user.email = stored.newEmail;
    await user.save();

    delete changeEmailOtpStore[normCurrent];

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