var HistoricPedestrian = require('../controllers/historicPedestrian')
var CrosswalkPedestrian = require('../controllers/crosswalkPedestrianRT')
var CrosswalkVehicle = require('../controllers/crosswalkVehicleRT')

const create = RegExp('.create');
const update = RegExp('.update');
const del = RegExp('.delete');

module.exports.handlePedestrian = (key , info) => { 
    if(create.test(key)){
      createPedestrianRegister(info)
    }
    else if (update.test(key)){
       updatePedestrianRegister(info) 
    }
    else if( del.test(key)){
      deletePedestrianRegister(info)
    }
}
createPedestrianRegister = info =>{
    let crossPedRT = {}
  
    let timestamp = Math.floor(Date.now() / 1000)
    var todayDate = new Date().toISOString().slice(0,10);
  
    crossPedRT.idPedestrian = info.idPedestrian
    crossPedRT.idCrosswalk = info.idCrosswalk
    crossPedRT.distance = info.distance
    crossPedRT.location = info.pedestrian
    crossPedRT.timestamp=timestamp
  
    CrosswalkPedestrian.createCrosswalkPedestrianRT(crossPedRT)
    .then(aux => {
          HistoricPedestrian.findHistoricPedestrian(info.idPedestrian,info.idCrosswalk,todayDate)
          .then(ress => { 
            if (ress.length ==0){
              
              let historic = {}
              historic.idPedestrian = info.idPedestrian
              historic.idCrosswalk = info.idCrosswalk
              historic.day = todayDate
  
              HistoricPedestrian.createHistoricPedestrian(historic)
              .then(aux => console.log("insert in historic"))
              .catch(err => console.log(err))
            }
  
          })
          .catch(err => console.log(err))
           
           
          CrosswalkVehicle.findVehicleInCrosswalk(info.idCrosswalk)
          .then (vehicles  => {
            vehicles.map( vei => {
              console.log("notificar veículo " + vei.idVehicle)
            })
          })
          
          .catch(err => console.log(err))
    })
    
    .catch(err => console.log(err))
  }
  
  
  updatePedestrianRegister = info => {
    let timestamp = Math.floor(Date.now() / 1000)
  
    CrosswalkPedestrian.updateCrosswalkPedestrianRT(info.idPedestrian,info.idCrosswalk,
                        info.pedestrian,info.distance,timestamp)
    .then(res => {
      CrosswalkVehicle.findVehicleInCrosswalk(info.idCrosswalk)
          .then (vehicles  => {
            vehicles.map( vei => {
              console.log("notificar veículo " + vei.idVehicle)
            })
          })
          .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
    
    
  }
  
  
  deletePedestrianRegister = info => {
    CrosswalkPedestrian.deleteCrosswalkPedestrianRT(info.idPedestrian)
    
  }
  
  