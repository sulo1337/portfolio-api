const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const config = require('config');

let transporter = nodemailer.createTransport({
    host: config.get('smtpHost'),
    port: 587,
    auth: {
        user: config.get('smtpUser'),
        pass: config.get('smtpPass')
    }
});

router.post('/', (req, res) => {
    const mailOptions = {
        from: 'admin@sulochanacharya.com',
        to: 's.acharya1337@gmail.com',
        subject: 'PORTFOLIO Contact Message',
        html: '<h3>You have a new message from ' + req.body.name + '</h3><br/><h5>Email: ' + req.body.email + '</h5><br/>Message: ' + req.body.message,
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) return res.status(500).send(err);
        return res.send('Mail sent successfully ' + JSON.stringify(info))
    })
})

module.exports = router;