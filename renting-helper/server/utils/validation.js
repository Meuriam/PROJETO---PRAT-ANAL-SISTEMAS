const Joi = require('@hapi/joi')

const messages = require('./messages')

const cutoffDate = new Date(Date.now() - (1000 * 60 * 60 * 24 * 365 * 18));


const UserValidation = Joi.object().keys({
    type: Joi.string()
        .valid('contratante', 'contratado')
        .messages(messages.user.type),
    name: Joi.string()
        .min(6)
        .max(255)
        .messages(messages.user.name),
    email: Joi.string()
        .email()
        .min(6)
        .max(255)
        .messages(messages.user.email),
    password: Joi.string()
        .min(6)
        .max(255)
        .messages(messages.user.password),
    birthday: Joi.date()
        .max(cutoffDate)
        .messages(messages.user.birthday),
    interests: Joi.array()
        .items()
        .messages(messages.user.interests),
    services: Joi.string()
        .messages(messages.user.services),
    image: Joi.string()
        .uri()
        .allow('')
        .optional(),
})

module.exports = UserValidation