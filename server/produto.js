const mongoose = require('mongoose')
const Schema =  mongoose.Schema; // Modelo de banco , pré determinando uma modelagem.

const produtoSchema =  new Schema({
    name: String,
});

module.exports = mongoose.model('produtos', produtoSchema);