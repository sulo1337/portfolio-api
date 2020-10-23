const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const config = require('config');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.get('gmailUser'),
        pass: config.get('gmailPass')
    }
});

router.post('/', (req, res) => {
    const mailOptions = {
        from: 'sulochan.acharya1@gmail.com',
        to: 'sulochan.acharya2@gmail.com',
        subject: 'PORTFOLIO Message',
        html: '<h3>You have a new message from ' + req.body.name + '</h3><br/>Email: ' + req.body.email + '<br/>Message: ' + req.body.message,
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) return res.status(500).send(err);
        return res.send('Mail sent successfully ' + info)
    })
})

module.exports = router;