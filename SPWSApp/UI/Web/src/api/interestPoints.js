export const getCrosswalks = () => {
  return fetch("http://localhost:3000/Crosswalk")
    .then((response) => response.json())
    .then((json) => json);
};

export const createCrosswalks = (title, latitude, longitude, state) => {
  return fetch("http://localhost:3000/Crosswalk", {
    method: "POST",
    body: JSON.stringify({
      title: title,
      latitude: latitude,
      longitude: longitude,
      state: state,
    }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      },   
  })
    .then((response) => response.json())
    .then((json) => json);
};

export const getRTPedestrian = (idCrosswalk) => {
  return fetch("http://localhost:3000/Crosswalk/Pedestrian/" + idCrosswalk)
    .then((response) => response.json())
    .then((json) => json);
};

export const getRTVehicle = (idCrosswalk) => {
  return fetch("http://localhost:3000/Crosswalk/Vehicle/" + idCrosswalk)
    .then((response) => response.json())
    .then((json) => json);
};

export const getHistoricoPedestrian = (idCrosswalk) => {
  return fetch("http://localhost:3000/Crosswalk/Historic/Pedestrian/" + idCrosswalk)
    .then((response) => response.json())
    .then((json) => json);
};

export const getHistoricoVehicle = (idCrosswalk) => {
  return fetch("http://localhost:3000/Crosswalk/Historic/Vehicle/" + idCrosswalk)
    .then((response) => response.json())
    .then((json) => json);
};
