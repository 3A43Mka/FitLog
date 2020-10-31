const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    trainer: {type: Types.ObjectId, ref: 'User', required: true},
    client: {type: Types.ObjectId, ref: 'User', required: true}
},
{versionKey: false});

module.exports = model('Link', schema);