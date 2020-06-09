import React, { useState, useEffect } from "react";
import {
  getCrosswalks,
  createCrosswalks,
  getRTPedestrian,
  getRTVehicle,
  getHistoricoPedestrian,
  getHistoricoVehicle,
} from "./crosswalks";

import {
  Header,
  Segment,
  Placeholder,
  Icon,
  Divider,
  Grid,
} from "semantic-ui-react";
import CrosswalksMap from "./CrosswalksMap";
import CrosswalksList from "./CrosswalksList";
import { Marker } from "leaflet";

function App() {
  const [isLoadingCrosswalks, setIsLoadingCrosswalks] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [viewport, setViewport] = useState({ center: null, zoom: 13 });
  const [info, setInfo] = useState(false);
  const [historic, setHistoric] = useState([]);
  const [realTime, setRealTime] = useState([]);

  const submitNewCrosswalk = (title, latitude, longitude, state) => {
    return createCrosswalks(title, latitude, longitude, state).then(
      (crosswalk) => {
        setMarkers((prevMarkers) => [...prevMarkers, crosswalk]);
      }
    );
  };

  const infoPoint = (title, latitude, long, state) => {
    console.log("O ID:" + id);
    console.log("LAT: " + latitude);
    console.log("LONG: " + long);
    console.log("NOME DA PASSADEIRA: " + title);
    setInfo({ title: title, latitude: latitude, long: long, state: state });
    return null;
  };

  const infoHistoric = () => {};

  const centerMap = (latitude, longitude) => {
    setViewport({ center: [latitude, longitude] });
  };

  useEffect(() => {
    setIsLoadingCrosswalks(true);
    getCrosswalks().then((crosswalks) => {
      setMarkers(crosswalks);

      if (crosswalks.length > 0) {
        const { latitude, longitude } = crosswalks[0];
        setViewport({ center: [latitude, longitude] });
      }

      setIsLoadingCrosswalks(false);
    });
  }, []);

  return (
    <React.Fragment>
      <Divider horizontal>
        <Header as="h4">
          <Icon name="crosshairs" />
          Crosswalks
        </Header>
      </Divider>

      <Grid columns={2} stackable>
        <Grid.Column>
          <Segment.Group>
            <Segment loading={isLoadingCrosswalks}>
              {isLoadingCrosswalks ? (
                <Placeholder>
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                </Placeholder>
              ) : (
                <CrosswalksList
                  markers={markers}
                  infoPoint={infoPoint}
                  centerMap={centerMap}
                />
              )}
            </Segment>
            <Segment>
              <CrosswalksMap
                viewport={viewport}
                markers={markers}
                submitNewCrosswalk={submitNewCrosswalk}
              />
            </Segment>
          </Segment.Group>
        </Grid.Column>
        {
          <Grid.Column>
            {info.latitude} {info.long} {info.title} {info.state}
          </Grid.Column>
        }
      </Grid>
    </React.Fragment>
  );
}

export default App;
