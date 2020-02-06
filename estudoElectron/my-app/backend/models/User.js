const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    _id: Number,
    nome: String,
    nacionalidade: String,
    pontos: Number
});

module.exports = mongoose.model('User', UserSchema);