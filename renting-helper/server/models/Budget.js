const { number } = require('@hapi/joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const budgetSchema = new Schema({
    service: {
        type: String,
        required: true
    },
    contratado: { 
        type: Schema.ObjectId, 
        ref: 'User' 
    },
    contratante: { 
        type: Schema.ObjectId, 
        ref: 'User' 
    },
    status:{
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Budget', budgetSchema, 'budgets');