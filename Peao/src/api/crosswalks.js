export const getCrosswalks = () => {
    return fetch("http://10.0.2.2:4545/crosswalks")
    .then((response) => response.json())
    .then((json) => json.crosswalks);
  };

export const distancePedestrian = (crosswalks,coordsPedestrian) => {
    return fetch('http://10.0.2.2:3000/distance/pedestrian',{
      method:'post',
      body:JSON.stringify({
        crosswalks :crosswalks,
        pedestrian : coordsPedestrian }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        },   
    })
    .then((response) => response.json())
    .then((json) => json.crosswalks);
    
  };

