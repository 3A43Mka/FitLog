const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    client: {type: Types.ObjectId, ref: 'User', required: true},
    title: {type: String, required: true},
    quantity: {type: Number, required: true},
    weights: {type: Number},
    date: {type: Date, required: true},
},
{versionKey: false});

module.exports = model('Exercise', schema);