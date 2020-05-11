#!/usr/bin/env node

var amqp = require('amqplib/callback_api');
var Monitoring = require('./src/monitoring')

const CONN_URL ='amqp://localhost'


let channelConsumer=null

var exchangeConsumer = "events"

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
                var key = "events.*.*"
            
                channel.bindQueue(q.queue, exchangeConsumer, key);
        

            channel.consume(q.queue, function(msg) {
                Monitoring.handleMsg(msg.fields.routingKey,msg.content)
            }, {
                noAck: true
            });
        });
        channelConsumer =channel
    });
});
}

module.exports.beforeExit = () =>{
    channelConsumer.close()
    console.log('Closing rabbitmq channel')
}  
