const PubNub = require('pubnub');
const uuid = PubNub.generateUUID();
var Connection =  require('./controllers/connection')
var amqp = require('amqplib/callback_api');
var mongoose = require('mongoose');

/****************************
 * MONGO CONNECTION
 ****************************/
const DATABASE_NAME = 'Connections';

mongoose.connect('mongodb://127.0.0.1:27017/' + DATABASE_NAME, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`Connected to Mongo at [${DATABASE_NAME}] database...`))
  .catch((erro) => console.log(`Mongo: Error connecting to [${DATABASE_NAME}]: ${erro}`))



const pubnub = new PubNub({
  publishKey: "pub-c-627ad9bf-507f-4fae-9a30-6fb40d8eff88",
  subscribeKey: "sub-c-2bc1178c-8e5e-11ea-927a-2efbc014b69f",
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


amqp.connect('amqp://localhost', function(error0, connection) {
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
    Connection.findConnection(info.idVehicle)
    .then( res => pubnub.publish({
      channel: res.uuid,
      message : {message : info.text}
    }))

}
