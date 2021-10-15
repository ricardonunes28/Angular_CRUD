const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const departament_controler = require('./departament_controler');
const produtos_controler = require('./produto_controler');

const app = express();
const PORTA = 3000;

mongoose.connect("mongodb+srv://ricardo_nunes:ricardo_nunes@cluster0.jlykd.mongodb.net/aplicacao_http?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })



app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors()); // Comentar em seguida
// app.use 


app.use('/departament', departament_controler)
app.use('/produtos', produtos_controler )


app.listen(PORTA, ()=>{
    console.log('Servidor rodando na porta '+ PORTA)
})