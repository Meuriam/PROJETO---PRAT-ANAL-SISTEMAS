const mongoose = require('mongoose');
const Schema = mongoose.Schema

const User = require('./User')

const UserContratado = User.discriminator('contratado', new Schema({
    services: {
        type: [String],
        required: true
    }
}));

module.exports = UserContratado