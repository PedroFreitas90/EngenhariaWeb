var Pedestrian = require('./controllers/pedestrians')

const create = RegExp('.create');
const update = RegExp('.update');


module.exports.handlePedestrian = (key , msg) => { 
    let info = JSON.parse(msg)
    if(create.test(key)){
      createPedestrianRegister(info)
    }
    else if (update.test(key)){
       updatePedestrianRegister(info) 
    }
} 



createPedestrianRegister = info => {

    var ped = {}
    
    let idPedestrian = info.idPedestrian
    let latitude = info.pedestrian.latitude
    let longitude = info.pedestrian.longitude
    let timestamp = Date.now()

    ped.idPedestrian = idPedestrian
    ped.latitude = latitude
    ped.longitude = longitude
    ped.timestamp = timestamp

    Pedestrian.getByID(idPedestrian)
    .then(res => {               
        if(res.length > 0){
            Pedestrian.updatePedestrian(idPedestrian,latitude,longitude,timestamp)
            .then(data => console.log("update Pedestrian location"))
            .catch(err => console.log(err))
        }

        else{
            Pedestrian.createPedestrian(ped)
            .then(data => console.log("create Pedestrian location"))
            .catch(err => console.log(err))
        }
    })
    .catch(err => console.log(err))

}


updatePedestrianRegister = info => {

    let idPedestrian = info.idPedestrian
    let latitude = info.pedestrian.latitude
    let longitude = info.pedestrian.longitude
    let timestamp = Date.now()

    Pedestrian.updatePedestrian(idPedestrian,latitude,longitude,timestamp)
    .then(data => console.log("update Pedestrian location"))
    .catch(err => console.log(err))


}