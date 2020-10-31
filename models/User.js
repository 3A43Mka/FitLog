const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, required: true},
    fullname: {type: String, required: true},
    registered: {type: Date, required: true},
},
{versionKey : false});

module.exports = model('User', schema);