const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    trainer: {type: Types.ObjectId, ref: 'User', required: true},
    client: {type: Types.ObjectId, ref: 'User', required: true},
    eventType: {type: Number, required: true},
    comment: {type: String},
    date: {type: Date, required: true},
    isActual: {type: Boolean}
},
{versionKey: false});

module.exports = model('Log', schema);