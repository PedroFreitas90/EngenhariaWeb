var axios = require ('axios')

const url = 'http://localhost:3004/Crosswalks/'
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
  
  axios.post(url.concat('Pedestrian'),crossPedRT)
  .then(aux => {
    axios.get(url.concat('Historic/Pedestrian?idPed=').concat(info.idPedestrian)
          .concat('&idCross=').concat(info.idCrosswalk)
          .concat('&day=').concat(todayDate)
    )
      .then(ress => { 
        if (ress.data.length ==0){    
          let historic = {}
          historic.idPedestrian = info.idPedestrian
          historic.idCrosswalk = info.idCrosswalk
          historic.day = todayDate;
          axios.post(url.concat('Historic/Pedestrian'),historic)
            .then(aux => console.log("insert in historic"))
            .catch(err => console.log(err))
          
        }
      })
      .catch(err => console.log(err))
        
      axios.get(url.concat('Vehicle?idCrosswalk='.concat(info.idCrosswalk)))
        .then(res1  => {
          var vehicles = res1.data  
          axios.get(url.concat(info.idCrosswalk).concat('/State'))
            .then(res2 => {
              var state = res2.data
              vehicles.map( vei => {
                axios.post('http://localhost:3005/notifications',{
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

updatePedestrianRegister = info => {
  let timestamp = Math.floor(Date.now() / 1000)
    
  axios.put(url.concat('Pedestrian'),{
    idPedestrian: info.idPedestrian,
    idCrosswalk: info.idPedestrian,
    location: info.pedestrian,
    distance: info.distance,
    timestamp: timestamp
  })
    .then(res => {
      axios.get(url.concat('Vehicle?idCrosswalk='.concat(info.idCrosswalk)))
      .then(res1  => {
        var vehicles = res1.data  
        axios.get(url.concat(info.idCrosswalk).concat('/State'))
          .then(res2 => {
            var state = res2.data
            vehicles.map( vei => {
              axios.post('http://localhost:3005/notifications',{
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
  
deletePedestrianRegister = info => {
  axios.delete(url.concat('Pedestrian/').concat(info.idPedestrian))
    .then(data => console.log('Pedestrian deleted with success!'))
    .catch(err => console.log(err))
};
  
  