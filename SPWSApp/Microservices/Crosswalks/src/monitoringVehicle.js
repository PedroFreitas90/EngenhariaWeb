var axios = require ('axios')

const url = 'http://localhost:3004/Crosswalks/'
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
  
  axios.post(url.concat('Vehicle'),crossVehRT)
    .then(aux => {
      axios.get(url.concat('Historic/Vehicle?idVeh=').concat(info.idVehicle)
      .concat('&idCross=').concat(info.idCrosswalk)
      .concat('&day=').concat(todayDate))
        .then(ress => { 
          if (ress.data.length ==0){     
            let historic = {}
            historic.idVehicle = info.idVehicle
            historic.idCrosswalk = info.idCrosswalk
            historic.day = todayDate
            
            axios.post(url.concat('Historic/Vehicle'),historic)
              .then(aux => console.log("Inserted in historic"))
              .catch(err => console.log(err))
            } 
        })
        .catch(err => console.log(err))

      axios.get(url.concat('Pedestrian?idCrosswalk='.concat(info.idCrosswalk)))
        .then(res1  => {
          var pedestrians = res1.data
          axios.get(url.concat(info.idCrosswalk).concat('/State'))
            .then(res2 => {
              var state = res2.data
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
  
  
updateVehicleRegister = info => {
  let timestamp = Math.floor(Date.now() / 1000)
  
  axios.put(url.concat('Vehicle'),{
    idVehicle : info.idVehicle,
    idCrosswalk : info.idCrosswalk,
    location : info.location,
    distance : info.distance,
    timestamp : timestamp
  })

  axios.get(url.concat('/Pedestrian?idCrosswalk='.concat(info.idCrosswalk)))
    .then(res1  => {
      var pedestrians = res1.data
      axios.get(url.concat(info.idCrosswalk).concat('/State'))
        .then(res2 => {
          var state = res2.data
          if(pedestrians.length > 0){
            console.log("notificar veículo " + info.idVehicle)
            axios.post('http://localhost:3005/notifications',{
                            idVehicle :info.idVehicle,
                            trafficLightsState : state[0].state,
                            crosswalkState : "Pedestrian Alert"
            })
          }
          else {
            console.log("notificar veículo " + info.idVehicle)
            axios.post('http://localhost:3005/notifications',{
                          idVehicle :info.idVehicle,
                          trafficLightsState : state[0].state,
                          crosswalkState : "Safe to cross"
            })
          }
        })
    })     
}
  
  
deleteVehicleRegister = info => {
  axios.delete(url.concat('Vehicle/').concat(info.idVehicle))
    .then(data => console.log('Vehicle deleted with success!'))
    .catch(err => console.log(err))
}
  