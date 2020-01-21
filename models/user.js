const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserShema = Schema({
    name: String,
    surname: String,
    nick: String,
    email: String,
    password: String,
});

module.exports = mongoose.model('User',UserShema);