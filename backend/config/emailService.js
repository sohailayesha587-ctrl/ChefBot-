const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'mail.chefbot.pk',
  port: parseInt(process.env.SMTP_PORT, 10) || 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

const sendOTPEmail = async (email, otp) => {
  try {
    await transporter.sendMail({
      from: `"ChefBot" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'ChefBot - Email Verification OTP',
      html: `
        <h2>ChefBot</h2>
        <p>Your OTP is: <strong>${otp}</strong></p>
        <p>Valid for 10 minutes.</p>
      `
    });

    return true;
  } catch (error) {
    console.error('Email error:', error.message);
    throw error;
  }
};

module.exports = { sendOTPEmail };