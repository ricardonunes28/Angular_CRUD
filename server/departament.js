const mongoose = require('mongoose')
const Schema =  mongoose.Schema; // Modelo de banco , pré determinando uma modelagem.

const departamentSchema =  new Schema({
    name: String,
});

module.exports = mongoose.model('Departament', departamentSchema);