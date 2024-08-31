const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();
const app = express();

const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: 'Gmail', // You can use other services like 'yahoo', 'hotmail', etc.
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS  // Your email password
  }
});

// POST route to send an email
app.post('/', async (req, res) => {
    console.log('Received request:', req.body); // Add this line
    const { subject, body, to } = req.body;
    console.log(process.env.EMAIL_USER);
    
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
  

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the Email Scheduling');
});

// Start server
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
