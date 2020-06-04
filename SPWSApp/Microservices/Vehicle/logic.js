var Vehicle = require('./controllers/vehicles')

const create = RegExp('.create');
const update = RegExp('.update');


module.exports.handleVehicle = (key , msg) => { 
    let info = JSON.parse(msg)
    console.log(info)
    if(create.test(key)){
      createVehicleRegister(info)
    }
    else if (update.test(key)){
       updateVehicleRegister(info) 
    }
} 



createVehicleRegister = info => {

    var ped = {}
    
    let idVehicle = info.idVehicle
    let latitude = info.vehicle.latitude
    let longitude = info.vehicle.longitude
    let timestamp = Date.now()

    ped.idVehicle = idVehicle
    ped.latitude = latitude
    ped.longitude = longitude
    ped.timestamp = timestamp

    Vehicle.getByID(idVehicle)
    .then(res => {               
        if(res.length > 0){
            Vehicle.updateVehicle(idVehicle,latitude,longitude,timestamp)
            .then(data => console.log("update Vehicle location"))
            .catch(err => console.log(err))
        }

        else{
            Vehicle.createVehicle(ped)
            .then(data => console.log("create Vehicle location"))
            .catch(err => console.log(err))
        }
    })
    .catch(err => console.log(err))

}


updateVehicleRegister = info => {

    let idVehicle = info.idVehicle
    let latitude = info.vehicle.latitude
    let longitude = info.vehicle.longitude
    let timestamp = Date.now()

    Vehicle.updateVehicle(idVehicle,latitude,longitude,timestamp)
    .then(data => console.log("update Vehicle location"))
    .catch(err => console.log(err))


}