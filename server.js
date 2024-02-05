const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require("dotenv").config()

const app = express();
const port = 3000;

// app.use(
//     cors({
//         origin: ["http://localhost:5173"],
//         credentials: true,
//     })
// );

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Middleware to parse JSON and form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_SERVER,
  port: process.env.SMTP_PORT,
  secure: true, // use SSL
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// API endpoint for sending emails
app.post('/send-email', (req, res) => {
  const { bodyContent } = req.body;

  transporter.sendMail({
    from: process.env.EMAIL_ADDRESS, 
    to: "amamrita0818@gmail.com",
    subject: "Noulamer - New Contact Form Submission",
    text: bodyContent
    }, (error, info) => {
        if (error) {
            console.error(error);
            return res.status(500).send(error.toString());
        } else {
            console.log('Email sent:', info.response);
            res.status(200).json(info.response);
        }
    }
);
});

app.get("/test", (req, res) => {
  res.send('<p> It is working </p>')
})

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
