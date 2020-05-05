
var rabbitMQ = require('./rabbitMQ')

rabbitMQ.rabbitMQ()

process.on('SIGINT',(code)=>{
  rabbitMQ.beforeExit()
  process.exit()
})
