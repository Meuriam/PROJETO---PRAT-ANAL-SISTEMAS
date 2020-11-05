const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    type: {
        type: String,
        enum: ['contratante', 'contratado']
    },
    name: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 255
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 6,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 1024
    },
    birthday: {
        type: Date,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: "https://openbook-cdn.s3-sa-east-1.amazonaws.com/img/default.png"
    }
}, {
    timestamps: true,
    discriminatorKey: 'type'
});

module.exports = mongoose.model('User', userSchema, 'users');