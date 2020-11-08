const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    trainer: {type: Types.ObjectId, ref: 'User', required: true},
    title: {type: String, required: true},
    text: {type: String, required: true},
    date: {type: Date, required: true},
},
{versionKey: false});

module.exports = model('Template', schema);