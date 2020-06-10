import React, { useState } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { Form } from "semantic-ui-react";

const CrosswalksMaps = ({ viewport, markers, submitNewCrosswalk }) => {
  const [newCrosswalk, setnewCrosswalk] = useState();

  const handleMapClick = (event) => {
    setnewCrosswalk({
      title: "",
      latitude: event.latlng.lat,
      longitude: event.latlng.lng,
      state: "GREEN"
    });
  };

  const handleNewPointTitleChange = (event) => {
    setnewCrosswalk({ ...newCrosswalk, title: event.target.value });
  };

  const handleNewPointSubmit = (event) => {
    event.preventDefault();

    submitNewCrosswalk(
      newCrosswalk.title,
      newCrosswalk.latitude,
      newCrosswalk.longitude,
      newCrosswalk.state
    ).then(() => {
      setnewCrosswalk(undefined);
    });
  };

  return (
    <Map
      className="map"
      viewport={viewport}
      maxZoom={18}
      minZoom={5}
      onclick={handleMapClick}
    >
      <TileLayer
        url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
        id="mapbox/streets-v11"
        tileSize={512}
        zoomOffset={-1}
        maxZoom={18}
        accessToken="pk.eyJ1IjoicnVpLWZvbnNlY2EiLCJhIjoiY2s4YTJpN3R2MDBscDNtbXhqeGM3emdndiJ9.3LJzQcbcLzQP1evTVWItOQ"
      />
      {markers.map(({ latitude, longitude, title, _id }) => {
        return (
          <Marker key={_id} position={[latitude, longitude]}>
            <Popup>{title}</Popup>
          </Marker>
        );
      })}
      {newCrosswalk && (
        <Popup
          key={`${newCrosswalk.latitude}-${newCrosswalk.longitude}`}
          position={[newCrosswalk.latitude, newCrosswalk.longitude]}
        >
          <Form onSubmit={handleNewPointSubmit}>
            <Form.Input
              autoFocus
              type="text"
              placeholder="Insert name..."
              value={newCrosswalk.title}
              onChange={handleNewPointTitleChange}
              action="Add"
            />
          </Form>
        </Popup>
      )}
    </Map>
  );
};

export default CrosswalksMaps;
