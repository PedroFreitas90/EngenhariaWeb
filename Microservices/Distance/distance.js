
var Calculate = require('./CalculateDistance')
var rabbitMQ = require('./rabbitMQ')

const ped = RegExp('.pedestrian');
const veh = RegExp('.vehicle');



module.exports.handleMsg= async (key,msg) => {
  let info = JSON.parse(msg)
  
  if(ped.test(key)){
    calculatePedestrianDistance(info)
  }
  else if (veh.test(key)){
     calculateVehicleDistance(info) 
  }
  
}

calculatePedestrianDistance = info => {
  var crosswalks = info.crosswalks
  var pedestrian = info.pedestrian
  var idPedestrian = info.idPedestrian

  let response = Calculate.isNearCrosswalk(crosswalks,pedestrian,0.010) 
  response.idPedestrian = idPedestrian
  response.pedestrian = pedestrian
  rabbitMQ.publish("monitoring.pedestrian",response)
}



calculateVehicleDistance = info => {
  var crosswalks = info.crosswalks
  var vehicle = info.vehicle
  var idVehicle = info.idVehicle

  let response = Calculate.isNearCrosswalk(crosswalks,vehicle,0.030) 
  response.idVehicle = idVehicle
  response.vehicle = vehicle
  rabbitMQ.publish("monitoring.vehicle",response)
}

 
