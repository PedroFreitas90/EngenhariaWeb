const mongoose = require('mongoose')

var vehiclesSchema = new mongoose.Schema({
    idVehicle: {type : String,required : true},
    latitude : {type : Number,required : true},
    longitude : {type : Number,required : true},
    timestamp: String
  });

module.exports = mongoose.model('vehicle', vehiclesSchema)