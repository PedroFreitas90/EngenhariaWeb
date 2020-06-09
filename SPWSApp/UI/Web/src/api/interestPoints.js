const axios = require('axios')

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
export const removeInterestPoint = (id) => {
  return fetch(`/interest-points/${id}`, {
    method: "DELETE",
  });
};
