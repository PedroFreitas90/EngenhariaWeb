var mongoose = require('mongoose');

var notificationSchema= new mongoose.Schema({
    idVehicle: {
        type: String,
        required: true
    },
    trafficLightsState: {
        type: String,
        required: true
    },
    crosswalkState: {
        type: String,
        required: true
    },
    timestamp:{
        type: Date,
        default: Date.now
    },
}, {
    versionKey: false
});

module.exports= mongoose.model('notification',notificationSchema);

