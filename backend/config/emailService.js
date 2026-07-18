const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendOTPEmail = async (email, otp) => {
  try {
    await transporter.sendMail({
      from: `"ChefBot" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'ChefBot - Password Reset OTP',
      html: `
        <h2>ChefBot</h2>
        <p>Your OTP is: <strong>${otp}</strong></p>
        <p>Valid for 10 minutes.</p>
      `
    });
    return true;
  } catch (error) {
    console.error('Email error:', error.message);
    return false;
  }
};

module.exports = { sendOTPEmail };