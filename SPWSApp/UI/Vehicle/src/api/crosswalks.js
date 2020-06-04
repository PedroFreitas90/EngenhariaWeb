export const getCrosswalks = () => {
    return fetch("http://172.26.13.124:3000/Crosswalk")
    .then((response) => response.json())
    .then((json) => json);
  };

export const distancePedestrian = (crosswalks,coordsVehicle,id) => {
    return fetch('http://172.26.13.124:3000/distance/vehicle',{
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

