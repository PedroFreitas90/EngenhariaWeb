var Vehicle = require('../models/vehicles')


module.exports.getAll = () => {
    return Vehicle.find()
}

module.exports.getByID = id => {
    return Vehicle.find({idVehicle : id})
}

module.exports.updateVehicle = (id, latitude ,longitude , timestamp) => {
    return Vehicle
            .updateOne({idVehicle : id},
             {$set : {
               latitude : latitude,
               longitude : longitude,
               timestamp : timestamp
             }})
            .exec() 
}



module.exports.createVehicle  = info => {
  var novo = new Vehicle(info)
  return novo.save()  
} 



