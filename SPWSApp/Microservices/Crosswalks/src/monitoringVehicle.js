var axios = require ('axios')

var CrosswalkPedestrian = require('../controllers/crosswalkPedestrianRT')
var HistoricVehicle = require('../controllers/historicVehicle')
var CrosswalkVehicle = require('../controllers/crosswalkVehicleRT')
var Crosswalk = require('../controllers/crosswalks')

  
module.exports.createVehicleRegister = info =>{
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
              .then(aux => console.log("Inserted in historic"))
              .catch(err => console.log(err))
            } 
        })
        .catch(err => console.log(err))

     
     CrosswalkPedestrian.findPedestrianInCrosswalk(info.idCrosswalk)
        .then(pedestrians  => {
        
        Crosswalk.getState(info.idCrosswalk)
            .then(state => {
              if(pedestrians.length > 0){
                console.log("notificar veículo " + info.idVehicle)
                axios.post('http://localhost:3005/notifications',{
                  idVehicle : info.idVehicle,
                  trafficLightsState : state[0].state,
                  crosswalkState : "Pedestrian Alert"
                })
              }
              else {
                console.log("notificar veículo " + info.idVehicle)
                axios.post('http://localhost:3005/notifications',{
                  idVehicle : info.idVehicle,
                  trafficLightsState : state[0].state,
                  crosswalkState : "Safe to cross"
                })
              }
            })
        })      
  })
  .catch(err => console.log(err))
}
  
  
module.exports.updateVehicleRegister = info => {
  let timestamp = Math.floor(Date.now() / 1000)
  
  CrosswalkVehicle.updateCrosswalkVehicleRT(info.idVehicle,info.idCrosswalk,info.vehicle,info.distance,timestamp)

CrosswalkPedestrian.findPedestrianInCrosswalk(info.idCrosswalk)
.then(pedestrians  => {

Crosswalk.getState(info.idCrosswalk)
    .then(state => {
      if(pedestrians.length > 0){
        console.log("notificar veículo " + info.idVehicle)
        axios.post('http://localhost:3005/notifications',{
          idVehicle : info.idVehicle,
          trafficLightsState : state[0].state,
          crosswalkState : "Pedestrian Alert"
        })
      }
      else {
        console.log("notificar veículo " + info.idVehicle)
        axios.post('http://localhost:3005/notifications',{
          idVehicle : info.idVehicle,
          trafficLightsState : state[0].state,
          crosswalkState : "Safe to cross"
        })
      }
    })
})      
      
}
  
  
module.exports.deleteVehicleRegister = info => {
  CrosswalkVehicle.deleteCrosswalkVehicleRT(info.idVehicle)
    .then(data => console.log('Vehicle deleted with success!'))
    .catch(err => console.log(err))
}
  