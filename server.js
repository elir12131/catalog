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
        user: 'roitblate@gmail.com',  // Your Gmail address
        pass: 'yedk dvsr bqar vxem'  // Replace with your App Password
    }
});

// Route to serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// POST endpoint to handle form submission
app.post('/submit', (req, res) => {
    const { customerName, itemNumber, quantity } = req.body;

    const mailOptions = {
        from: 'roitblate@gmail.com', // Your email
        to: 'mrpoppysny@gmail.com',    // Replace with your recipient email
        subject: 'New Order Submission',
        text: `Customer Name: ${customerName}\nItem Number: ${itemNumber}\nQuantity: ${quantity}`
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
