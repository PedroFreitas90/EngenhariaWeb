var axios = require ('axios')

var CrosswalkPedestrian = require('../controllers/crosswalkPedestrianRT')
var HistoricPedestrian = require('../controllers/historicPedestrian')
var CrosswalkVehicle = require('../controllers/crosswalkVehicleRT')
var Crosswalk = require('../controllers/crosswalks')




module.exports.createPedestrianRegister = info =>{
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
          historic.day = todayDate;
          
          HistoricPedestrian.createHistoricPedestrian(historic)
            .then(aux => console.log("insert in historic"))
            .catch(err => console.log(err))
          
        }
      })
      .catch(err => console.log(err))
        
     
     CrosswalkVehicle.findVehicleInCrosswalk(info.idCrosswalk)
        .then(vehicles  => {  

        Crosswalk.getState(info.idCrosswalk)
            .then(state => {
              vehicles.map( vei => {
                axios.post('http://notification-service:3005/notifications',{
                  idVehicle :vei.idVehicle,
                  trafficLightsState : state[0].state,
                  crosswalkState : "Pedestrian Alert"
                })
              })
            }) 
        })
        .catch(err => console.log(err))
  })
  .catch(err => console.log(err))
};

module.exports.updatePedestrianRegister = info => {
  let timestamp = Math.floor(Date.now() / 1000)

  CrosswalkPedestrian.updateCrosswalkPedestrianRT(info.idPedestrian,info.idCrosswalk,info.pedestrian,info.distance,timestamp)
    .then(res => {
      CrosswalkVehicle.findVehicleInCrosswalk(info.idCrosswalk)
      .then(vehicles  => {  
      Crosswalk.getState(info.idCrosswalk)
          .then(state => {
            vehicles.map( vei => {
              axios.post('http://notification-service:3005/notifications',{
                idVehicle :vei.idVehicle,
                trafficLightsState : state[0].state,
                crosswalkState : "Pedestrian Alert"
              })
            })
          }) 
      })
      .catch(err => console.log(err))
    })
    .catch(err => console.log(err))  
};
  
module.exports.deletePedestrianRegister = info => {
  CrosswalkPedestrian.deleteCrosswalkPedestrianRT(info.idPedestrian)
    .then(data => console.log('Pedestrian deleted with success!'))
    .catch(err => console.log(err))
};
  
  