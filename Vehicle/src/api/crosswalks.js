export const getCrosswalks = () => {
    return fetch("http://10.0.2.2:3000/crosswalks")
    .then((response) => response.json())
    .then((json) => json.crosswalks);
  };

export const distancePedestrian = (crosswalks,coordsVehicle,id) => {
    return fetch('http://10.0.2.2:3000/distance/vehicle',{
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

