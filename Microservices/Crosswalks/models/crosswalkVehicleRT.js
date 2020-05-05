const mongoose = require('mongoose')

var location = {
  latitude : Number,
  longitude :Number
}


var crosswalkVehicleRTSchema = new mongoose.Schema({
    idVehicle: { type: String, required: true },
    idCrosswalk: { type: String, required: true },
    location : location,
    distance: {type: Number,required:true},
    timestamp: String
  });

module.exports = mongoose.model('crosswalkVehicle', crosswalkVehicleRTSchema)