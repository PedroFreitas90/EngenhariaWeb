var CrosswalkVehicleRT = require('../models/crosswalkVehicleRT')



module.exports.createCrosswalkVehicleRT = (info) => {
    var novo = new CrosswalkVehicleRT(info)
    return novo.save()
}


module.exports.updateCrosswalkVehicleRT = (id,idCross, location , distance,timestamp) => {
    return CrosswalkVehicleRT
            .updateOne({idVehicle :id , idCrosswalk : idCross},
                {$set :{
                    location : location,
                    distance : distance,
                    timestamp : timestamp            
            } })
            .exec()
}


module.exports.deleteCrosswalkVehicleRT = (id) => {
    return CrosswalkVehicleRT
            .deleteMany({idVehicle :id})
            .exec()
}



module.exports.findVehicleCrosswalk = (idVehicle,crosswalk_id) => {
    return CrosswalkVehicleRT
            .find({idVehicle: idVehicle, idCrosswalk:crosswalk_id})
            .exec()
}


module.exports.findVehicleInCrosswalk = (crosswalk_id) => {
    return CrosswalkVehicleRT
            .find({idCrosswalk:crosswalk_id})
            .exec()
}


module.exports.findVehicle = (idVehicle) => {
    return CrosswalkVehicleRT
            .find({idVehicle: idVehicle})
            .exec()
}







            

    


