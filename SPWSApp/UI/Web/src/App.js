import React, { useEffect, useState } from "react";
import {
  getCrosswalks,
  createCrosswalks,
  removeInterestPoint,
} from "./api/interestPoints";
import InterestPointsMaps from "./InterestPointsMap";
import { Header,
  Segment,
  Placeholder,
  Icon,
  Divider,
  Grid, } from "semantic-ui-react";
import "./App.css";
import InterestPointsList from "./InterestPointsList";

function App() {
  const [markers, setMarkers] = useState([]);
  const [viewport, setViewport] = useState({ center: null, zoom: 13 });
  const [isLoadingInterestPoints, setIsLoadingInterestPoints] = useState(false);
  const [info, setInfo] = useState(false);

  useEffect(() => {
    setIsLoadingInterestPoints(true);
    getCrosswalks().then((interestPoints) => {
      setMarkers(interestPoints);
      setIsLoadingInterestPoints(false);

      if (interestPoints.length > 0) {
        const { latitude, longitude } = interestPoints[0];
        setViewport({ center: [latitude, longitude] });
      }
    });
  }, []);

  const infoPoint = (title, latitude, long, state) => {
    //console.log("O ID:" + id);
    console.log("LAT: " + latitude);
    console.log("LONG: " + long);
    console.log("NOME DA PASSADEIRA: " + title);
    setInfo({ title: title, latitude: latitude, long: long, state: state });
  };

  const submitNewCrosswalk = (title, latitude, longitude, state) => {
    return createCrosswalks(title, latitude, longitude, state).then((crosswalk) => {
        setMarkers((prevMarkers) => [...prevMarkers, crosswalk]);
      }
    );
  };

  const centerMap = (latitude, longitude) => {
    setViewport({ center: [latitude, longitude] });
  };


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
            <Segment loading={isLoadingInterestPoints}>
              {isLoadingInterestPoints ? (
                <Placeholder>
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                </Placeholder>
              ) : (
                <InterestPointsList
                  markers={markers}
                  infoPoint={infoPoint}
                  centerMap={centerMap}
                />
              )}
         </Segment>
            <Segment>
              <InterestPointsMaps
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
