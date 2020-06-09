var HistoricVehicle = require('../models/historicVehicle')


module.exports.createHistoricVehicle = (info) => {
    var novo = new HistoricVehicle(info)
    return novo.save()
}

module.exports.findHistoricVehicle = (idVehicle , idCrosswalk,day) => {
    return HistoricVehicle
            .find({idVehicle:idVehicle, idCrosswalk:idCrosswalk, day : {$eq: day}})
            .exec()
}


module.exports.findHistoric = (idCrosswalk) =>{
    return HistoricVehicle
            .find({idCrosswalk:idCrosswalk})
            .exec()
}
