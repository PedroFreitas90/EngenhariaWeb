var Connection = require('../models/connection')


module.exports.createConnection = (info) => {
    var novo = new Connection(info)
    return novo.save()
}


module.exports.updateConnection = (idVehicle,uuid) => {
    return Connection
            .updateOne({idVehicle},
                {$set : { uuid : uuid}})
            .exec()    
}

module.exports.findConnection = (idVehicle) => {
    return Connection.find({idVehicle : idVehicle},{uuid : 1})
    .exec() 
}






