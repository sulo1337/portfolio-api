const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { Skill, validate } = require('../models/skills');

router.get('/', (req, res) => {
    Skill.find().sort('skill').lean()
        .then((skills) => {
            return res.send(skills);
        }).catch((err) => {
            return res.status(500).send(`Internal server error: ${err.message}`);
        });
});

router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let skill = await Skill.findOne({ skill: req.body.skill });
    if (skill) return res.status(400).send(`Skill already exists`);

    skill = new Skill({
        skill: req.body.skill
    });

    skill.save().
        then(() => {
            return res.send(skill);
        })
        .catch((err) => {
            return res.status(500).send(`Internal server error: ${err.message}`);
        });
});

module.exports = router;