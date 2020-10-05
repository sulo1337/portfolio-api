const mongoose = require('mongoose');
const Joi = require('joi');
const projectSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
    },
    desc: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    git: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    tech: [{ type: String, required: true }]
})


const Project = mongoose.model("Project", projectSchema);

function validate(project) {
    const schema = {
        name: Joi.string().min(2).required(),
        desc: Joi.string().required(),
        link: Joi.string().required(),
        git: Joi.string().required(),
        date: Joi.string().required(),
        tech: Joi.array()
    }

    return Joi.validate(project, schema);
}

module.exports.Project = Project;
module.exports.validate = validate;