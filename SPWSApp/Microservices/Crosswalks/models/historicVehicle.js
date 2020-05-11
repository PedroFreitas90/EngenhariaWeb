const mongoose = require('mongoose')



var historicSchema = new mongoose.Schema({
    idVehicle: { type: String, required: true },
    idCrosswalk: { type: String, required: true },
    day: {type : Date ,require: true}
  });

module.exports = mongoose.model('historicVehicle', historicSchema)