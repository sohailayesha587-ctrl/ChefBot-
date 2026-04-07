const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  profilePicture: { type: String, default: '' },
  agreeToTerms: { type: Boolean, required: true, default: false },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  isBlocked: { type: Boolean, default: false },
  
  // Reset Password
  resetPasswordToken: { type: String, default: null },
  resetPasswordExpiry: { type: Date, default: null },
  
  // Security
  loginAttempts: { type: Number, default: 0 },
  lockUntil: { type: Date, default: null },
  
  // Notification Settings
  emailNotifications: { type: Boolean, default: true },
  pushNotifications: { type: Boolean, default: true },
  
  // Appearance Settings
  theme: { type: String, enum: ['light', 'dark'], default: 'light' },
  language: { type: String, enum: ['en', 'ur'], default: 'en' },
  
  // ======================
  // DAILY REPORT PREFERENCES
  // ======================
  reportPreferences: {
    reminderTime: { type: String, default: "21:00" },
    autoMarkAfterDays: { type: Number, default: 2 },
    defaultAction: { type: String, enum: ['skip', 'assume_none', 'ask_again'], default: 'assume_none' },
    enableReminders: { type: Boolean, default: true },
    lastReminderSent: { type: Date, default: null }
  },
  
  // Missed reports log
  missedReportsLog: [{
    date: { type: Date },
    action: { type: String, enum: ['skipped', 'reminded', 'auto_filled', 'ignored'], default: 'skipped' },
    resolvedAt: { type: Date, default: Date.now }
  }]

}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

// Generate password reset token
userSchema.methods.generatePasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.resetPasswordExpiry = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

// Check if account is locked
userSchema.methods.isAccountLocked = function() {
  if (!this.lockUntil) return false;
  return this.lockUntil > Date.now();
};

// Increment login attempts
userSchema.methods.incrementLoginAttempts = async function() {
  if (this.lockUntil && this.lockUntil < Date.now()) {
    this.loginAttempts = 1;
    this.lockUntil = null;
  } else {
    this.loginAttempts += 1;
    if (this.loginAttempts >= 3 && !this.lockUntil) {
      this.lockUntil = Date.now() + 30 * 60 * 1000;
    }
  }
  await this.save();
};

// Reset login attempts on successful login
userSchema.methods.resetLoginAttempts = async function() {
  this.loginAttempts = 0;
  this.lockUntil = null;
  await this.save();
};

module.exports = mongoose.model('User', userSchema);