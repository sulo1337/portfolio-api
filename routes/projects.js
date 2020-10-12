const express = require('express');
const router = express.Router();
const { Project, validate } = require('../models/projects');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
    Project.find().lean().sort('date')
        .then((projects) => {
            return res.send(projects);
        })
        .catch((err) => {
            return res.status(500).send(`Internal server error: ${err.message}`);
        });
});

router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const project = new Project(req.body);
    project.save()
        .then(() => res.send(project))
        .catch((err) => { res.status(500).send(`Internal server error: ${err.message}`) });
});

router.put('/:id', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    Project.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(project => {
            if (project) {
                return res.send(project);
            } else {
                return res.status(404).send(`Project with id ${req.params.id} not found.`);
            }
        })
        .catch(err => {
            return res.status(404).send(`Project with id ${req.params.id} not found.`);
        });

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
});

module.exports = router;