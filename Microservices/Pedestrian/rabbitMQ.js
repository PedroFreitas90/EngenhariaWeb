#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

module.exports.rabbitMQ = () => {
amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }
        var exchange = 'pedestrian_position';

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
                var key = "pedestrian"
            
                channel.bindQueue(q.queue, exchange, key);
        

            channel.consume(q.queue, function(msg) {
                console.log(" [x] %s", msg.fields.routingKey);
                console.log(JSON.parse(msg.content))
            }, {
                noAck: true
            });
        });
    });
});
}
