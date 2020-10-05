const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
})

userSchema.methods.generateJwtToken = function () {
    return jwt.sign({ _id: this.id, email: this.email }, config.get('jwtPrivateKey'));
}

const User = mongoose.model("User", userSchema);

function validate(user) {
    const schema = {
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }

    return Joi.validate(user, schema);
}

module.exports.User = User;
module.exports.validate = validate;