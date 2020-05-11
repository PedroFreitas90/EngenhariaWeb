const mongoose = require('mongoose')



var historicSchema = new mongoose.Schema({
    idPedestrian: { type: String, required: true },
    idCrosswalk: { type: String, required: true },
    day: {type : Date ,require: true}
  });

module.exports = mongoose.model('historicPedestrian', historicSchema)