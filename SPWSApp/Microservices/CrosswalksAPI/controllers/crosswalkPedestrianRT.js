var CrosswalkPedestrianRT = require('../models/crosswalkPedestrianRT')


module.exports.createCrosswalkPedestrianRT = (info) => {
    var novo = new CrosswalkPedestrianRT(info)
    return novo.save()
}


module.exports.updateCrosswalkPedestrianRT = (id,idCross, location , distance,timestamp) => {
    return CrosswalkPedestrianRT
            .updateOne({idPedestrian :id , idCrosswalk : idCross},
                {$set :{
                    location : location,
                    distance : distance,
                    timestamp : timestamp            
            } })
            .exec()
}


module.exports.deleteCrosswalkPedestrianRT = (id) => {
    return CrosswalkPedestrianRT
            .deleteMany({idPedestrian :id})
            .exec()
}

module.exports.findPedestrianCrosswalk = (idPedestrian,crosswalk_id) => {
    return CrosswalkPedestrianRT
            .find({idPedestrian : idPedestrian,idCrosswalk:crosswalk_id})
            .exec()
}

module.exports.findPedestrianInCrosswalk = (crosswalk_id) => {
    return CrosswalkPedestrianRT
            .find({idCrosswalk:crosswalk_id})
            .exec()
}





module.exports.findPedestrian = (idPedestrian) => {
    return CrosswalkPedestrianRT
            .find({idPedestrian: idPedestrian})
            .exec()
}








            

    


