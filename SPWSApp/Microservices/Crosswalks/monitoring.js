var rabbitMQ = require('./rabbitMQ')
var CrosswalkPedestrian = require('./controllers/crosswalkPedestrianRT')
var CrosswalkVehicle = require('./controllers/crosswalkVehicleRT')

var HandlePedestrian = require('./src/monitoringPedestrian')
var HandleVehicle = require('./src/monitoringVehicle')



const ped = RegExp('.pedestrian');
const veh = RegExp('.vehicle');

module.exports.handleMsg= (key,msg) => {
  let info = JSON.parse(msg)
  if(ped.test(key)){
    monitoringPedestrian(info)
  }
  else if (veh.test(key)){
    monitoringVehicle(info)
  }
}  

monitoringPedestrian = info => { 
  let isNear = info.isNear
  let idPedestrian = info.idPedestrian
  console.log(info)
  if(isNear){
    let idCrosswalk = info.idCrosswalk
    
   // axios.get(url.concat('Pedestrian/'.concat(idPedestrian)).concat('?idCross='.concat(idCrosswalk)))
    CrosswalkPedestrian.findPedestrianCrosswalk(idPedestrian,idCrosswalk)
      .then(res => {
        if(res.length > 0){ // ja estava perto de uma passadeira
          //udpate de coordenadas e distancia  
          rabbitMQ.publish("events.Pedestrian.update",info)  
          HandlePedestrian.updatePedestrianRegister(info)
        }
        else { // nao estava perto da passadeira
          rabbitMQ.publish("events.Pedestrian.create",info)
          HandlePedestrian.createPedestrianRegister(info)

        } 
      })
      .catch(err => console.log(err))
  }
  else{
   // axios.get(url.concat('Pedestrian/'.concat(idPedestrian)))
    CrosswalkPedestrian.findPedestrian(idPedestrian)
      .then(res =>{  
        if(res.length > 0){ // estava perto de uma passadeira
        //update coordenadas e retirar da collection de monitorização
        HandlePedestrian.deletePedestrianRegister(info) 
      } 
    })
    .catch(err => console.log(err))
  }
}

monitoringVehicle = info => {
  let isNear = info.isNear
  let idVehicle = info.idVehicle
  console.log(info)
  if(isNear){
    let idCrosswalk = info.idCrosswalk
    
   // axios.get(url.concat('Vehicle/'.concat(idVehicle)).concat('?idCross='.concat(idCrosswalk)))
   CrosswalkVehicle.findVehicleCrosswalk(idVehicle, idCrosswalk)
      .then(res => {
        if(res.length > 0){ // ja estava perto de uma passadeira
          //udpate de coordenadas e distancia  
          rabbitMQ.publish("events.Vehicle.update",info)
          HandleVehicle.updateVehicleRegister(info)  
        }
        else { // nao estava perto da passadeira
          rabbitMQ.publish("events.Vehicle.create",info)
          HandleVehicle.createVehicleRegister(info)
        } 
      })
      .catch(err => console.log(err))
  }

  else{
  //  axios.get(url.concat('Vehicle/'.concat(idVehicle)))
  CrosswalkVehicle.findVehicle(idVehicle)
      .then(res =>{  
        if(res.length > 0){ // estava perto de uma passadeira
        //update coordenadas e retirar da collection de monitorização
        HandleVehicle.deleteVehicleRegister(info)
        } 
      })
      .catch(err => console.log(err))
  }
}
    