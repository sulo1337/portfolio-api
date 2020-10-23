const mongoose = require('mongoose');
const Joi = require('joi');

const skillSchema = mongoose.Schema({
    skill: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    }
});

const Skill = mongoose.model("Skill", skillSchema);

function validate(skill) {
    const schema = {
        skill: Joi.string().required(),
        link: Joi.string().required(),
        title: Joi.string().required(),
    }

    return Joi.validate(skill, schema);
}

module.exports.Skill = Skill;
module.exports.validate = validate;