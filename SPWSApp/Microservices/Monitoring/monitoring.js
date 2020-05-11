var rabbitMQ = require('./rabbitMQ')
const axios = require('axios');

const url = 'localhost:3333/Monitoring'
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
    
    axios.get(url.concat('Pedestrian/'.concat(idPedestrian)).concat('?idCross='.concat(idCrosswalk)))
      .then(res => {
        if(res.length > 0){ // ja estava perto de uma passadeira
          //udpate de coordenadas e distancia  
          rabbitMQ.publish("events.Pedestrian.update",info)  
        }
        else { // nao estava perto da passadeira
          rabbitMQ.publish("events.Pedestrian.create",info)
        } 
      })
      .catch(err => console.log(err))
  }
  else{
    axios.get(url.concat('Pedestrian/'.concat(idPedestrian)))
      .then(res =>{  
        if(res.length > 0){ // estava perto de uma passadeira
        //update coordenadas e retirar da collection de monitorização
        rabbitMQ.publish("events.Pedestrian.delete",info)    
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
    
    axios.get(url.concat('Vehicle/'.concat(idVehicle)).concat('?idCross='.concat(idCrosswalk)))
      .then(res => {
        if(res.length > 0){ // ja estava perto de uma passadeira
          //udpate de coordenadas e distancia  
          rabbitMQ.publish("events.Vehicle.update",info)  
        }
        else { // nao estava perto da passadeira
          rabbitMQ.publish("events.Vehicle.create",info)
        } 
      })
      .catch(err => console.log(err))
  }

  else{
    axios.get(url.concat('Vehicle/'.concat(idVehicle)))
      .then(res =>{  
        if(res.length > 0){ // estava perto de uma passadeira
        //update coordenadas e retirar da collection de monitorização
        rabbitMQ.publish("events.Vehicle.delete",info)    
        } 
      })
      .catch(err => console.log(err))
  }
}
    