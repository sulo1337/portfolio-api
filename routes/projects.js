const express = require('express');
const router = express.Router();
const { Project, validate } = require('../models/projects');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
    const projects = await Project.find().lean().sort('date');
    if (!projects) return res.status(500).send(`Internal Server Error`);

    res.send(projects);
});

router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const project = new Project(req.body);
    await project.save();
    res.send(project);
});

router.put('/:id', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.send(400).send(error.details[0].message);

    Project.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(project => {
            res.send(project);
        })
        .catch(err => {
            res.status(404).send(`Project with id ${req.params.id} not found.`);
        });

    res.send(project);
});

router.delete('/:id', auth, async (req, res) => {
    Project.findByIdAndRemove(req.params.id)
        .then(project => {
            if (project) {
                return res.send(project);
            } else {
                return res.status(404).send(`Project with id ${req.params.id} not found.`);
            }
        })
        .catch((err) => {
            return res.send(404).send(`Project with id ${req.params.id} not found`)
        });


    res.send(project);
});

module.exports = router;