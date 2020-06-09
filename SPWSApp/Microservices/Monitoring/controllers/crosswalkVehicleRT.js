var CrosswalkVehicleRT = require('../models/crosswalkVehicleRT')



module.exports.findVehicleInCrosswalk = (idVehicle,crosswalk_id) => {
    return CrosswalkVehicleRT
            .find({idVehicle: idVehicle,idCrosswalk:crosswalk_id})
            .exec()
}

module.exports.findVehicle = (idVehicle) => {
    return CrosswalkVehicleRT
            .find({idVehicle: idVehicle})
            .exec()
}




