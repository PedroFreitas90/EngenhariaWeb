import React, { useEffect, useState } from "react";
import {
  getCrosswalks,
  createCrosswalks,
  getRTPedestrian,
  getRTVehicle,
  getHistoricoPedestrian,
  getHistoricoVehicle 
} from "./api/interestPoints";
import InterestPointsMaps from "./InterestPointsMap";
import { Header,
  Segment,
  Placeholder,
  Icon,
  Divider,
  Grid,
List } from "semantic-ui-react";
import "./App.css";
import InterestPointsList from "./InterestPointsList";

function App() {
  const [markers, setMarkers] = useState([]);
  const [viewport, setViewport] = useState({ center: null, zoom: 13 });
  const [isLoadingInterestPoints, setIsLoadingInterestPoints] = useState(false);
  const [info, setInfo] = useState(false);
  const [pedestrianRT, setPedestrianRT] = useState([])
  const [vehicleRT, setVehicleRT] = useState([])
  const [historicPedestrian,setHistoricPedestrian] = useState([])
  const [historicVehicle,setHistoricVehicle] = useState([])


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

  const infoPoint = (id,title, latitude, long, state) => {
    console.log("LAT: " + latitude);
    console.log("LONG: " + long);
    console.log("NOME DA PASSADEIRA: " + title);
    getRTPedestrian(id).then((pedestrianRT) => {
      getRTVehicle(id).then((vehicleRT) => {
        getHistoricoPedestrian(id).then((historicPed) => {
          getHistoricoVehicle(id).then((historicVeh) => {
            console.log(pedestrianRT)
            console.log(vehicleRT)
            console.log(historicPed)
            console.log(historicVeh)

          setVehicleRT(vehicleRT)
          setPedestrianRT(pedestrianRT)
          setHistoricPedestrian(historicPed)
          setHistoricVehicle(historicVeh)
          setInfo({ title: title, latitude: latitude, long: long, state: state });

          })
        })
      })
    })
    
    


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
        <List divided selection>
         {pedestrianRT.map((pRT) => {
            return (
              <List.Item
                key={pRT._id}
              > 
              <List.Content>
              <List.Header>{pRT.distance}</List.Header>
            </List.Content>
            </List.Item>
            );
         })}
         </List>

        </Grid>
    </React.Fragment>
  );
}

export default App;
