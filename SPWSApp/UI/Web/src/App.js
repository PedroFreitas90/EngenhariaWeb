import React, { useEffect, useState } from "react";
import {
  getCrosswalks,
  createCrosswalks,
  getRTPedestrian,
  getRTVehicle,
  getHistoricoPedestrian,
  getHistoricoVehicle,
} from "./api/interestPoints";
import InterestPointsMaps from "./InterestPointsMap";
import {
  Header,
  Segment,
  Placeholder,
  Icon,
  Divider,
  Grid,
  List,
  Button,
  Label,
} from "semantic-ui-react";
import "./App.css";
import InterestPointsList from "./InterestPointsList";

function App() {
  const [markers, setMarkers] = useState([]);
  const [viewport, setViewport] = useState({ center: null, zoom: 13 });
  const [isLoadingInterestPoints, setIsLoadingInterestPoints] = useState(false);
  const [info, setInfo] = useState(false);
  const [pedestrianRT, setPedestrianRT] = useState([]);
  const [vehicleRT, setVehicleRT] = useState([]);
  const [historicPedestrian, setHistoricPedestrian] = useState([]);
  const [historicVehicle, setHistoricVehicle] = useState([]);

  const ColoredLine = ({ color }) => (
    <hr
      style={{
        color: color,
        backgroundColor: color,
        height: 3,
        marginTop: 20,
        marginBottom: 20,
        marginRight: 10,
      }}
    />
  );

  useEffect(() => {
    setIsLoadingInterestPoints(true);
    getCrosswalks().then((interestPoints) => {
      setMarkers(interestPoints);
      setIsLoadingInterestPoints(false);

      if (interestPoints.length === 0) {
        setViewport({ center: [41.14961, -8.61099] });
      } else {
        const { latitude, longitude } = interestPoints[0];
        setViewport({ center: [latitude, longitude] });
      }
    });
  }, []);

  const infoPoint = (id, title, latitude, long, state) => {
    console.log("LAT: " + latitude);
    console.log("LONG: " + long);
    console.log("NOME DA PASSADEIRA: " + title);
    getRTPedestrian(id).then((pedestrianRT) => {
      getRTVehicle(id).then((vehicleRT) => {
        getHistoricoPedestrian(id).then((historicPed) => {
          getHistoricoVehicle(id).then((historicVeh) => {
            console.log(pedestrianRT);
            console.log(vehicleRT);
            console.log(historicPed);
            console.log(historicVeh);

            setVehicleRT(vehicleRT);
            setPedestrianRT(pedestrianRT);
            setHistoricPedestrian(historicPed);
            setHistoricVehicle(historicVeh);
            setInfo({ title: title, latitude: latitude, long: long, state: state });
          });
        });
      });
    });
  };

  const submitNewCrosswalk = (title, latitude, longitude, state) => {
    return createCrosswalks(title, latitude, longitude, state).then((crosswalk) => {
      setMarkers((prevMarkers) => [...prevMarkers, crosswalk]);
    });
  };

  const centerMap = (latitude, longitude) => {
    setViewport({ center: [latitude, longitude] });
  };

  return (
    <React.Fragment>
      <Divider horizontal style={{ marginRight: 500, marginLeft: 500 }}>
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
                pedestrianRT_markers={pedestrianRT}
                vehicleRT_markers={vehicleRT}
                submitNewCrosswalk={submitNewCrosswalk}
              />
            </Segment>
          </Segment.Group>
        </Grid.Column>
        {
          <Grid.Column>
            <List divided relaxed style={{ marginRight: 10 }}>
              <List.Item as="a">
                <Icon name="sticky note" />
                <List.Content>
                  <List.Header>Crosswalk Name</List.Header>
                  <List.Description>{info.title}</List.Description>
                </List.Content>
              </List.Item>

              <List.Item as="a">
                <Icon name="marker" />
                <List.Content>
                  <List.Header>Location</List.Header>
                  <List.Description>
                    {info.latitude}, {info.long}
                  </List.Description>
                </List.Content>
              </List.Item>

              <List.Item as="a">
                <Icon name="accessible" />
                <List.Content>
                  <List.Header>Crosswalk State</List.Header>
                  <List.Description>{info.state}</List.Description>
                </List.Content>
              </List.Item>
            </List>

            <ColoredLine color="black" />
            <Segment style={{ marginRight: 10 }}>
              <Header floated="left">
                <Button as="div" labelPosition="right">
                  <Button color="blue">
                    <Icon name="clock" />
                    Real Time
                  </Button>
                  <Label as="a" basic color="blue" pointing="left">
                    {pedestrianRT.length + vehicleRT.length}
                  </Label>
                </Button>
              </Header>
              <List>
                <List.Item>
                  <List>
                    <List.Content>
                      <List.List>
                        <List.Item>
                          <List.Icon name="right triangle" />
                          <List.Content>
                            <List.Header>Pedestrian</List.Header>
                            <List.Description>
                              {pedestrianRT.map((pRT) => {
                                return (
                                  <List as="ul">
                                    <List.Item as="li" key={pRT._id}>
                                      <List.Content>
                                        <List.Description>
                                          <b>ID:</b> {pRT.idPedestrian}
                                          <br></br>
                                          <b>Distance:</b> {pRT.distance}m
                                        </List.Description>
                                      </List.Content>
                                    </List.Item>
                                    <hr></hr>
                                  </List>
                                );
                              })}
                            </List.Description>
                          </List.Content>
                        </List.Item>
                        <List.Item>
                          <List.Icon name="right triangle" />
                          <List.Content>
                            <List.Header>Vehicle</List.Header>
                            <List.Description>
                              {vehicleRT.map((vRT) => {
                                return (
                                  <List as="ul">
                                    <List.Item as="li" key={vRT._id}>
                                      <List.Content>
                                        <List.Description>
                                          <b>ID:</b> {vRT.idVehicle} <br></br>
                                          <b>Distance:</b> {vRT.distance}m
                                        </List.Description>
                                      </List.Content>
                                    </List.Item>
                                    <hr></hr>
                                  </List>
                                );
                              })}
                            </List.Description>
                          </List.Content>
                        </List.Item>
                      </List.List>
                    </List.Content>
                  </List>
                </List.Item>
              </List>

              <Divider section />

              <Header floated="right">
                <Button as="div" labelPosition="right">
                  <Button color="blue">
                    <Icon name="history" />
                    Historic
                  </Button>
                  <Label as="a" basic color="blue" pointing="left">
                    {historicPedestrian.length + historicVehicle.length}
                  </Label>
                </Button>
              </Header>
              <List>
                <List.Item>
                  <List>
                    <List.Content>
                      <List.List>
                        <List.Item>
                          <List.Icon name="right triangle" />
                          <List.Content>
                            <List.Header>Pedestrian</List.Header>
                            <List.Description>
                              {historicPedestrian.map((pH) => {
                                return (
                                  <Segment>
                                    <List as="ul">
                                      <List.Item as="li" key={pH._id}>
                                        <List.Content>
                                          <List.Header>Day: {pH.day}</List.Header>
                                          <List.Description>
                                            ID: {pH.idPedestrian}
                                          </List.Description>
                                        </List.Content>
                                      </List.Item>
                                    </List>
                                  </Segment>
                                );
                              })}
                            </List.Description>
                          </List.Content>
                        </List.Item>
                        <List.Item>
                          <List.Icon name="right triangle" />
                          <List.Content>
                            <List.Header>Vehicle</List.Header>
                            <List.Description>
                              {historicVehicle.map((vH) => {
                                return (
                                  <Segment>
                                    <List as="ul">
                                      <List.Item as="li" key={vH._id}>
                                        <List.Content>
                                          <List.Header>Day: {vH.day}</List.Header>
                                          <List.Description>
                                            ID: {vH.idVehicle}
                                          </List.Description>
                                        </List.Content>
                                      </List.Item>
                                    </List>
                                  </Segment>
                                );
                              })}
                            </List.Description>
                          </List.Content>
                        </List.Item>
                      </List.List>
                    </List.Content>
                  </List>
                </List.Item>
              </List>
            </Segment>

            {/* <Grid>
              <Grid.Column floated="left" width={5}>
                <Button as="div" labelPosition="right">
                  <Button color="blue">
                    <Icon name="clock" />
                    Real Time
                  </Button>
                  <Label as="a" basic color="blue" pointing="left">
                    {pedestrianRT.length + vehicleRT.length}
                  </Label>
                </Button>
                <List>
                  <List.Item>
                    <List>
                      <List.Content>
                        <List.List>
                          <List.Item>
                            <List.Icon name="right triangle" />
                            <List.Content>
                              <List.Header>Pedestrian</List.Header>
                              <List.Description>
                                {pedestrianRT.map((pRT) => {
                                  return (
                                    <List as="ul">
                                      <List.Item as="li" key={pRT._id}>
                                        <List.Content>
                                          <List.Description>
                                            <b>ID:</b> {pRT.idPedestrian}
                                            <br></br>
                                            <b>Distance:</b> {pRT.distance}m
                                          </List.Description>
                                        </List.Content>
                                      </List.Item>
                                      <hr></hr>
                                    </List>
                                  );
                                })}
                              </List.Description>
                            </List.Content>
                          </List.Item>
                          <List.Item>
                            <List.Icon name="right triangle" />
                            <List.Content>
                              <List.Header>Vehicle</List.Header>
                              <List.Description>
                                {vehicleRT.map((vRT) => {
                                  return (
                                    <List as="ul">
                                      <List.Item as="li" key={vRT._id}>
                                        <List.Content>
                                          <List.Description>
                                            <b>ID:</b> {vRT.idVehicle} <br></br>
                                            <b>Distance:</b> {vRT.distance}m
                                          </List.Description>
                                        </List.Content>
                                      </List.Item>
                                      <hr></hr>
                                    </List>
                                  );
                                })}
                              </List.Description>
                            </List.Content>
                          </List.Item>
                        </List.List>
                      </List.Content>
                    </List>
                  </List.Item>
                </List>
              </Grid.Column>

              <Grid.Column width={7}>
                <Button as="div" labelPosition="right">
                  <Button color="blue">
                    <Icon name="history" />
                    Historic
                  </Button>
                  <Label as="a" basic color="blue" pointing="left">
                    {historicPedestrian.length + historicVehicle.length}
                  </Label>
                </Button>

                <List>
                  <List.Item>
                    <List>
                      <List.Content>
                        <List.List>
                          <List.Item>
                            <List.Icon name="right triangle" />
                            <List.Content>
                              <List.Header>Pedestrian</List.Header>
                              <List.Description>
                                {historicPedestrian.map((pH) => {
                                  return (
                                    <Segment>
                                      <List as="ul">
                                        <List.Item as="li" key={pH._id}>
                                          <List.Content>
                                            <List.Header>Day: {pH.day}</List.Header>
                                            <List.Description>
                                              ID: {pH.idPedestrian}
                                            </List.Description>
                                          </List.Content>
                                        </List.Item>
                                      </List>
                                    </Segment>
                                  );
                                })}
                              </List.Description>
                            </List.Content>
                          </List.Item>
                          <List.Item>
                            <List.Icon name="right triangle" />
                            <List.Content>
                              <List.Header>Vehicle</List.Header>
                              <List.Description>
                                {historicVehicle.map((vH) => {
                                  return (
                                    <Segment>
                                      <List as="ul">
                                        <List.Item as="li" key={vH._id}>
                                          <List.Content>
                                            <List.Header>Day: {vH.day}</List.Header>
                                            <List.Description>
                                              ID: {vH.idVehicle}
                                            </List.Description>
                                          </List.Content>
                                        </List.Item>
                                      </List>
                                    </Segment>
                                  );
                                })}
                              </List.Description>
                            </List.Content>
                          </List.Item>
                        </List.List>
                      </List.Content>
                    </List>
                  </List.Item>
                </List>
              </Grid.Column>
            </Grid>*/}
          </Grid.Column>
        }
      </Grid>
    </React.Fragment>
  );
}

export default App;
