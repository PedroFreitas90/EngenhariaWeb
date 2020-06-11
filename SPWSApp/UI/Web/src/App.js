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
  const [hp, setHP] = useState([]);
  const [hv, setHV] = useState([]); 


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

  const checkHDayArray = (arr, day) =>{
    if (arr.length === 0){
      return false;
    }
    var flag = 0;
    arr.forEach(d => {
      if (d.day === day)
        flag = 1;
    });
    
    if(flag)
      return true;
    else
      return false;
  };

  const checkHDayIndex = (arr, day) =>{
    let i = 0;
    arr.forEach(d =>{
      if (d.day === day)
        return i;
      i+= 1;
    })
    return i;
  };

  const organizeHistoric = (historic) =>{
    console.log('<ORGANIZAR>')
    console.log(historic);
    if (historic.length === 0){
      console.log('</Organizar>');
      return [];
    }
    else{
      var ret = []
      var form = {
        idCrosswalk: historic[0].idCrosswalk,
        hday:[]
      };
      
      historic.forEach(h => {
        console.log('*-------ORGANIZE_HISTORIC_FOREACH----------------*')
        var test = h.day.split('-')
        var aux = test[2]
        var day = aux[0].concat(aux[1])
        var n_hd = test[0].concat('-').concat(test[1]).concat('-').concat(day)
        if(!checkHDayArray(form.hday, n_hd)){ //não existe dia , tenho de criar novo
          var nd ={ //formato de um doc do array hday
            day: n_hd,
            ids:[]
          };
          if(h.idPedestrian)
            nd.ids.push(h.idPedestrian);
          if(h.idVehicle)
            nd.ids.push(h.idVehicle)
          form.hday.push(nd); //adicionao ao hday
        }
        else { //já existe o dia no array hday
          var index = checkHDayIndex(form.hday, n_hd) //tenho o index do hday
          if(h.idPedestrian)
            form.hday[index].ids.push(h.idPedestrian);
          if(h.idVehicle)
            form.hday[index].ids.push(h.idVehicle)
        }
      });
    }
    ret.push(form);
    console.log('hora da verdade');
    console.log(ret);
    console.log('</Organizar>')
    return ret;
  }

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
            //console.log(pedestrianRT);
            //console.log(vehicleRT);
            //console.log(historicPed);
            console.log(historicVeh);

            setVehicleRT(vehicleRT);
            setPedestrianRT(pedestrianRT);
            var n_p_h = organizeHistoric(historicPed);
            console.log(n_p_h)
            var n_v_h = organizeHistoric(historicVeh)
            console.log(n_v_h)
            setHistoricPedestrian(historicPed);
            setHistoricVehicle(historicVeh)
            setHP(n_p_h);
            setHV(n_v_h);
            
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
                              {/*(hp.hday).map((hd) =>{
                                return(
                                  <Segment>
                                    <List as="ul">
                                      <List.Item>
                                        <List.Content>
                                          <List.Header>Day: {hd.day}</List.Header>
                                          <List.Description>
                                            {hd.map((my_id)=>{
                                              return(
                                                <List as="li" key={my_id}>
                                                  <b>ID:</b> {my_id}
                                                </List>
                                              )
                                            })}
                                          </List.Description>
                                        </List.Content>
                                      </List.Item>
                                    </List>
                                  </Segment>
                                )
                              })

                            */}
                              
                              
                              {hp.map((pH) => {
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
                              })}}
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
