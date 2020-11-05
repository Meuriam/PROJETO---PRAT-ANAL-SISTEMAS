const mongoose = require('mongoose');
const Schema = mongoose.Schema

const User = require('./User')

const UserContratante = User.discriminator('contratante', new Schema({

}));

module.exports = UserContratante