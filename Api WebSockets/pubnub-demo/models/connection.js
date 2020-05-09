const mongoose = require('mongoose')


var connectionSchema = new mongoose.Schema({
    idVehicle : {type :String ,required : true},
    uuid : {type : String ,required : true}

})


module.exports = mongoose.model('connection', connectionSchema)