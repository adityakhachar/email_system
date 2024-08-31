const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use other services like 'yahoo', 'hotmail', etc.
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS  // Your email password
  }
});

// POST route to send an email
router.post('/send', async (req, res) => {
  const { subject, body, to } = req.body;

  if (!subject || !body || !to) {
    return res.status(400).json({ error: 'Subject, body, and recipient email are required.' });
  }

  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text: body
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

module.exports = router;
