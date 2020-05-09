#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

var logic = require('./logic')


const CONN_URL ='amqp://localhost'
var exchange = "events"
let ch=null

module.exports.rabbitMQ = () => {
amqp.connect(CONN_URL, function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }
        ch=channel

        channel.assertExchange(exchange, 'topic', {
            durable: false
        });

        channel.assertQueue('', {
            exclusive: true
        }, function(error2, q) {
            if (error2) {
                throw error2;
            }
            console.log(' [*] Waiting for logs. To exit press CTRL+C');
                var key = "events.Pedestrian.*"
            
                channel.bindQueue(q.queue, exchange, key);
        

            channel.consume(q.queue, function(msg) {
                logic.handlePedestrian(msg.fields.routingKey,msg.content)
            
            }, {
                noAck: true
            });
        });
    });
});
}
module.exports.beforeExit = () =>{
    ch.close()
    console.log('Closing rabbitmq channel')
} 
