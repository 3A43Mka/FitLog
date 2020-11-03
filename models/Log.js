const {Schema, model, Types} = require('mongoose');

// 1 - assign trainer to client
// 2 - create program

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