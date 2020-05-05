var CrosswalkPedestrian = require('../controllers/crosswalkPedestrianRT')
var CrosswalkVehicle = require('../controllers/crosswalkVehicleRT')
var HistoricVehicle = require('../controllers/historicVehicle')



const create = RegExp('.create');
const update = RegExp('.update');
const del = RegExp('.delete');

module.exports.handleVehicle = (key, info) => {
    if(create.test(key)){
      createVehicleRegister(info)
    }
    else if (update.test(key)){
       updateVehicleRegister(info) 
    }
    else if( del.test(key)){
      deleteVehicleRegister(info)
    }
  }
  
  
  
  
  
  
  createVehicleRegister = info =>{
    let crossVehRT = {}
  
    let timestamp = Math.floor(Date.now() / 1000)
    var todayDate = new Date().toISOString().slice(0,10);
  
  
    crossVehRT.idVehicle = info.idVehicle
    crossVehRT.idCrosswalk = info.idCrosswalk
    crossVehRT.distance = info.distance
    crossVehRT.location = info.vehicle
    crossVehRT.timestamp=timestamp
  
    CrosswalkVehicle.createCrosswalkVehicleRT(crossVehRT)
    .then(aux => {
          HistoricVehicle.findHistoricVehicle(info.idVehicle,info.idCrosswalk,todayDate)
          .then(ress => { 
            
            if (ress.length ==0){
              
              let historic = {}
              historic.idVehicle = info.idVehicle
              historic.idCrosswalk = info.idCrosswalk
              historic.day = todayDate
  
              HistoricVehicle.createHistoricVehicle(historic)
              .then(aux => console.log("insert in historic"))
              .catch(err => console.log(err))
            }
  
           })
  
           .catch(err => console.log(err))
          
          CrosswalkPedestrian.findPedestrianInCrosswalk(info.idCrosswalk)
          .then (pedestrians  => {
              if(pedestrians.length > 0)
              console.log("notificar veículo " + info.idVehicle)
            })
          })
  
          .catch(err => console.log(err)) 
  
    .catch(err => console.log(err))
  }
  
  
  updateVehicleRegister = info => {
    let timestamp = Math.floor(Date.now() / 1000)
  
    CrosswalkVehicle.updateCrosswalkVehicleRT(info.idVehicle,info.idCrosswalk,
                        info.vehicle,info.distance,timestamp)
    // notificações
    
    
  }
  
  
  deleteVehicleRegister = info => {
  CrosswalkVehicle.deleteCrosswalkVehicleRT(info.idVehicle)
    // notificaçoes
  }
  