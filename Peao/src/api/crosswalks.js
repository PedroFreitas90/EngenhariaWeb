export const getCrosswalks = () => {
    return fetch("http://10.0.2.2:3000/crosswalks")
    .then((response) => response.json())
    .then((json) => json);
  };

export const distancePedestrian = (crosswalks,coordsPedestrian,id) => {
    return fetch('http://10.0.2.2:3000/distance/pedestrian',{
      method:'post',
      body:JSON.stringify({
        crosswalks :crosswalks,
        pedestrian : coordsPedestrian,
        idPedestrian : id }), // so para teste
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        },   
    })
    .then((response) => response.json())
    .then((json) => json);
    
  };

