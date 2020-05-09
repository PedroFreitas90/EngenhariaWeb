const mongoose = require('mongoose')

var crosswalkSchema = new mongoose.Schema({
    title: String,
    latitude : {type : Number,required : true},
    longitude : {type : Number,required : true},
    state :{type : String,required : true},
    timestamp: String
  });

module.exports = mongoose.model('crosswalk', crosswalkSchema)