
var amqp = require('amqplib/callback_api');
const CONN_URL ='amqp://rabbitmq' 

let ch = null;
var exchange = 'distance';
amqp.connect(CONN_URL, function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw erroJavaScriptr1;
        }
        

        channel.assertExchange(exchange, 'topic', {
            durable: false
        });
        ch = channel
    })
})
        

module.exports.publish = (key, message) => {
    ch.publish(exchange, key,Buffer.from(JSON.stringify(message)));
        console.log(" [x] Sent %s: '%s'", key, message);
    }

module.exports.beforeExit = () =>{
    ch.close()
    console.log('Closing rabbitmq channel')
}    
