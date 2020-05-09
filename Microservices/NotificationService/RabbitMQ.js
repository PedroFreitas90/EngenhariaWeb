var amqp = require('amqplib/callback_api');
const CONN_URL ='amqp://localhost' 


var sendQueue = 'notificationChannel';
var ch = null;
amqp.connect(CONN_URL, function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }
        
        

        channel.assertQueue(sendQueue, {
            durable: false
        });
        ch = channel;
    });
});

const send = not => {
    console.log('No send')
    ch.sendToQueue(sendQueue, Buffer.from(JSON.stringify(not)));
    console.log(" [x] Sent %s",JSON.stringify(not))
}

module.exports = {send};