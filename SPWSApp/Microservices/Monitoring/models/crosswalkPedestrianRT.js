const mongoose = require('mongoose')

var location = {
  latitude : Number,
  longitude :Number
}

var crosswalkRTSchema = new mongoose.Schema({
    idPedestrian: { type: String, required: true },
    idCrosswalk: { type: String, required: true },
    location :location,
    distance: {type: Number,required:true},
    timestamp: Number
  });

module.exports = mongoose.model('CrosswalkPedestrian', crosswalkRTSchema)