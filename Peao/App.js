import React,{useState, useEffect} from 'react';
import { getCrosswalks,distancePedestrian } from "./src/api/crosswalks";
import createMockServer from "./src/mock/server"
import { Container, Text, List, ListItem, View,Icon } from 'native-base';
import MapView, {Marker,Circle} from 'react-native-maps'
import {StyleSheet, Image } from 'react-native'
import * as Location from 'expo-location';


//createMockServer();

const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    text: {
      color : "white"
    },
    crosswalk:{
      height: 35, 
      width:35 
    }
  });




export default function App (){
    const [markers, setMarkers] = useState([]);
    const [isLoadingCrosswalks, setIsLoadingCrosswalks] = useState(false);
    const [error, setError] = useState(null);
    const [position , setPosition] =useState(null)

  
 
    useEffect(() => {
        setIsLoadingCrosswalks(true);
        
        (async () => {
          let { status } = await Location.requestPermissionsAsync();
          if (status !== 'granted') {
            setError('Permission to access location was denied');
          }
    
          let location = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.Highest});
          setPosition({
            latitude: Number (location.coords.latitude),
            longitude: Number (location.coords.longitude),
          })

          

        })();

      
        getCrosswalks().then((crosswalks) => {
          setMarkers(crosswalks);
          distancePedestrian(markers,position)
          setIsLoadingCrosswalks(false);
        });

       
      }, []);
        
        let text = 'Waiting..';
        if (error) {
          text = error;
        } else if (position) {
          text = JSON.stringify(position);
        }

        
    
    
    function success(pos) {
      setPosition({
        latitude: Number (pos.coords.latitude),
        longitude: Number (pos.coords.longitude),
      })
    }
    

    var options = {
      accuracy: Location.Accuracy.Highest,
      timeInterval: 10000,
    };
    

       
        
      //  Location.watchPositionAsync(options,success)
        //.then(watchid => console.log(watchid))
        
        

    return (
        <Container>
           <Text> Crosswalks </Text>
            {isLoadingCrosswalks ? (
        <Text>Loading...</Text>
      ) : (
        <List>
            {markers.map((point) => {
                return (
                    <ListItem key ={point.id} >
                        <Text>{point.title}: [{point.latitude}, {point.longitude}] </Text>
                    </ListItem>
                );
            })}

        </List>
        )}
         { position ? (
            <MapView
            style = {styles.map}
            provider = "google"
            showsUserLocation= {true}
            userLocationUpdateInterval ={1000}
            region={{
                latitude: position.latitude,
                longitude: position.longitude,
                latitudeDelta: 0.001,
                longitudeDelta: 0.001,
            }}>
             {markers.map(({ latitude, longitude, title, id }) => {
                  return (
                    <Marker key ={id}
                            coordinate={{latitude, longitude}}
                            title = {title}>
                               <Image style = {styles.crosswalk}
                  source={require('./assets/passadeira.bmp')} >
                  </Image>    

                    </Marker>
                  );
                })}

              
              <Marker    
                    key ={"me"}
                            coordinate={position}
                            title = {"me"}
              >
              </Marker>
             
   
   
        
            </MapView> 
        ):(
              <Text>{text}</Text>    
         )}

<Text>{JSON.stringify(position)}</Text> 
        </Container>
    )

}

