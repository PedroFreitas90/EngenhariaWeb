const PubNub = require('pubnub');
const uuid = PubNub.generateUUID();
var Connection =  require('./controllers/connection')
var amqp = require('amqplib/callback_api');
var mongoose = require('mongoose');

/****************************
 * MONGO CONNECTION
 ****************************/
const DATABASE_NAME = 'Connections';

mongoose.connect('mongodb://mongo:27017/' + DATABASE_NAME, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`Connected to Mongo at [${DATABASE_NAME}] database...`))
  .catch((erro) => console.log(`Mongo: Error connecting to [${DATABASE_NAME}]: ${erro}`))



const pubnub = new PubNub({
  publishKey: /* É preciso uma chave de pubnub*/,
  subscribeKey: /* É preciso uma chave de pubnub*/,
  uuid: uuid
});



pubnub.addListener({
  message: function(message) {
    console.log(message)
    let id = message.message.idVehicle
      Connection.findConnection(id)
      .then (res => {
           if (res.length > 0)
            Connection.updateConnection(id,message.publisher)
            else
            Connection.createConnection({
              idVehicle : id ,
              uuid : message.publisher
            }) 
      })
  },
  presence: function(userEvent) {
      console.log(userEvent)
      
  }

})


pubnub.subscribe({
  channels: ["API WEBSOCKETS"],
  withPresence :true
});


amqp.connect('amqp://rabbitmq', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'notificationChannel';

        channel.assertQueue(queue, {
            durable: false
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, function(msg) {
          handleMsg(msg.content)
        }, {
            noAck: true
        });
    });
});

const handleMsg = (msg) => {
    let info = JSON.parse(msg)
    console.log(info)
    Connection.findConnection(info.idVehicle)
    .then( res =>{ 
      console.log(res)
      pubnub.publish({
      channel: res[0].uuid,
      message :info.text
    })
  })
}
