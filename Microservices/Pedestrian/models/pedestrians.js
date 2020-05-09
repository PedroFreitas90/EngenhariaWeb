const mongoose = require('mongoose')

var pedestriansSchema = new mongoose.Schema({
    idPedestrian: {type : String,required : true},
    latitude : {type : Number,required : true},
    longitude : {type : Number,required : true},
    timestamp: String
  });

module.exports = mongoose.model('pedestrian', pedestriansSchema)