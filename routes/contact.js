const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const config = require('config');

let transporter = nodemailer.createTransport({
    host: 'in-v3.mailjet.com',
    port: 587,
    auth: {
        user: config.get('smtpUser'),
        pass: config.get('smtpPass')
    }
});

router.post('/', (req, res) => {
    const mailOptions = {
        from: 'sulochan.acharya2@gmail.com',
        to: 's.acharya1337@gmail.com',
        subject: 'PORTFOLIO Message',
        html: '<h3>You have a new message from ' + req.body.name + '</h3><br/>Email: ' + req.body.email + '<br/>Message: ' + req.body.message,
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) return res.status(500).send(err);
        return res.send('Mail sent successfully ' + info)
    })
})

module.exports = router;