import {Platform} from 'react-native'

const ip = Platform.OS === 'ios' ? "http://localhost:3000" : "http://10.0.2.2:3000"

export const getCrosswalks = () => {
    return fetch(ip.concat("/Crosswalk"))
    .then((response) => response.json())
    .then((json) => json);
  };

export const distancePedestrian = (crosswalks,coordsVehicle,id) => {
    return fetch(ip.concat("/distance/vehicle"),{
      method:'post',
      body:JSON.stringify({
        crosswalks :crosswalks,
        vehicle : coordsVehicle,
        idVehicle : id }), // so para teste
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        },   
    })
    .then((response) => response.json())
    .then((json) => json);
    
  };

