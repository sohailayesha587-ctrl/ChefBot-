const nodemailer = require('nodemailer')

const sendContactMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all fields.'
      })
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.CONTACT_EMAIL,
        pass: process.env.CONTACT_EMAIL_PASS
      }
    })

    await transporter.sendMail({
      from: process.env.CONTACT_EMAIL,
      to: process.env.CONTACT_EMAIL,
      replyTo: email,
      subject: `ChefBot Contact Message from ${name}`,
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `
    })

    return res.status(200).json({
      success: true,
      message: 'Message sent successfully!'
    })
  } catch (error) {
    console.error('Contact Email Error:', error)

    return res.status(500).json({
      success: false,
      message: 'Failed to send message.'
    })
  }
}

module.exports = { sendContactMessage }