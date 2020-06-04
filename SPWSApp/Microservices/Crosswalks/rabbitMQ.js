#!/usr/bin/env node

var amqp = require('amqplib/callback_api');
var Monitoring = require('./monitoring')

const CONN_URL ='amqp://rabbitmq'

let channelProducer=null
let channelConsumer=null
var exchangeProducer = "events"

var exchangeConsumer = "monitoring"

module.exports.rabbitMQ = () => {
amqp.connect(CONN_URL, function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        channel.assertExchange(exchangeConsumer, 'topic', {
            durable: false
        });

        channel.assertQueue('', {
            exclusive: true
        }, function(error2, q) {
            if (error2) {
                throw error2;
            }
                var key = "monitoring.*"
            
                channel.bindQueue(q.queue, exchangeConsumer, key);
        

            channel.consume(q.queue, function(msg) {
                Monitoring.handleMsg(msg.fields.routingKey,msg.content)
            }, {
                noAck: true
            });
        });
        channelConsumer =channel
    });


    connection.createChannel(function(error1, channelP) {
        if (error1) {
            throw error1;
        }

        channelP.assertExchange(exchangeProducer, 'topic', {
            durable: false
        });

        channelProducer = channelP
       
    });
});
}

module.exports.publish = (key, message) => {
    channelProducer.publish(exchangeProducer, key,Buffer.from(JSON.stringify(message)));
    console.log(" [x] Sent %s: '%s'", key, message);
}


module.exports.beforeExit = () =>{
    channelConsumer.close()
    channelProducer.close()
    console.log('Closing rabbitmq channel')
}  
