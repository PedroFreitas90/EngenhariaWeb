var CrosswalkPedestrianRT = require('../models/crosswalkPedestrianRT')



module.exports.findPedestrianInCrosswalk = (idPedestrian,crosswalk_id) => {
    return CrosswalkPedestrianRT
            .find({idPedestrian: idPedestrian,idCrosswalk:crosswalk_id})
            .exec()
}

module.exports.findPedestrian = (idPedestrian) => {
    return CrosswalkPedestrianRT
            .find({idPedestrian: idPedestrian})
            .exec()
}




