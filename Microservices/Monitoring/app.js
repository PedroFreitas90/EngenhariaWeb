
var rabbitMQ = require('./rabbitMQ')
var mongoose = require('mongoose');

/****************************
 * MONGO CONNECTION
 ****************************/
const DATABASE_NAME = 'Crosswalks';

mongoose.connect('mongodb://127.0.0.1:27017/' + DATABASE_NAME, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`Connected to Mongo at [${DATABASE_NAME}] database...`))
  .catch((erro) => console.log(`Mongo: Error connecting to [${DATABASE_NAME}]: ${erro}`))


rabbitMQ.rabbitMQ()

process.on('SIGINT',(code)=>{
  rabbitMQ.beforeExit()
  process.exit()
})
