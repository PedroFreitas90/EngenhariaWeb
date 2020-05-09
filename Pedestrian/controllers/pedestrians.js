var Pedestrian = require('../models/pedestrians')


module.exports.getAll = () => {
    return Pedestrian.find()
}

module.exports.getByID = id => {
    return Pedestrian.find({idPedestrian : id})
}

module.exports.updatePedestrian = (id, latitude ,longitude , timestamp) => {
    return Pedestrian
            .updateOne({idPedestrian : id},
             {$set : {
               latitude : latitude,
               longitude : longitude,
               timestamp : timestamp
             }})
            .exec() 
}



module.exports.createPedestrian  = info => {
  var novo = new Pedestrian(info)
  return novo.save()  
} 



