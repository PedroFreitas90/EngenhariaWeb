var express = require('express');
var rabbitMQ = require('./rabbitMQ')
var app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


rabbitMQ.rabbitMQ()

let PORT = '5959'
app.listen(PORT,()=>{
  console.log("Servidor á escuta na porta " + PORT)
})


module.exports = app;
