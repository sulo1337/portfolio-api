const express = require('express');
const router = express.Router();
const { Project, validate } = require('../models/projects');
const auth = require('../middleware/auth');

router.get('/', auth, (req, res) => {
    res.send('projects');
});

router.post('/', (req, res) => {

});

router.put('/', (req, res) => {

});

router.delete('/', (req, res) => {

});

module.exports = router;