var MonitoringPedestrian = require('./monitoringPedestrian')
var MonitoringVehicle = require('./monitoringVehicle')





const ped = RegExp('.Pedestrian.');
const veh = RegExp('.Vehicle.');

module.exports.handleMsg=  (key,msg) => {
  let info = JSON.parse(msg)
  
  if( ped.test(key)){
      MonitoringPedestrian.handlePedestrian(key,info)
  }
  else if ( veh.test(key)) {
    MonitoringVehicle.handleVehicle(key,info)
  }
}


