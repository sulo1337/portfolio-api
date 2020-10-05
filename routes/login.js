const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User, validate } = require('../models/users');

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(401).send(error.details[0].message);

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send(`Invalid email or password`);

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send(`Invalid email or password`);

    const token = user.generateJwtToken();
    res.header('x-auth-token', token).send('Login successful');
})

module.exports = router;