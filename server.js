// server.js

require('dotenv').config(); // Load environment variables
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (like your HTML file)
app.use(express.static(path.join(__dirname, 'public')));

// Nodemailer configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Use your environment variable
        pass: process.env.EMAIL_PASS,   // Use your environment variable
    },
});

// Route to serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// POST endpoint to handle form submission
app.post('/submit', (req, res) => {
    const { customerName, items } = req.body; // Update to get items array

    // Format items into a message
    const itemDetails = items.map(item => `Item Number: ${item.itemNumber}, Quantity: ${item.quantity}`).join('\n');

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'mrpoppysny@gmail.com',
        subject: 'New Order Submission',
        text: `Customer Name: ${customerName}\n${itemDetails}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
            return res.status(500).send('Error sending email');
        }
        console.log('Email sent:', info.response);
        res.status(200).send('Order submitted successfully!');
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
