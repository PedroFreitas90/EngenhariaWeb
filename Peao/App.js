import React,{useState, useEffect,} from 'react';
import { getCrosswalks,distancePedestrian } from "./src/api/crosswalks";

import MapView, {Marker,Circle} from 'react-native-maps'
import {StyleSheet, Image,Dimensions,View,Text } from 'react-native'
import * as Location from 'expo-location';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
    text: {
      color : 'white'
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
    const [position , setPosition] =useState({latitude : 0 , longitude :0})
    const [watchid,setWatchid] = useState()

    //const uniqueId = getUniqueId()

   function success(pos) {
    const location = {
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude,
    }
    setPosition({
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude,
    })
      if(markers.length>0)
    distancePedestrian(markers,location,10).then((isNear) => {
        if(isNear)
        console.log("SOCKETSSS")
        else {
          console.log("NAO SOCKETSSS")
        }
    })
    
  }


    
  

      useEffect(()=>{
        getCrosswalks().then((crosswalks) => {
          setMarkers(crosswalks);
          setIsLoadingCrosswalks(false);
        })
        return () => {
          console.log("cleaned up");
        };
      },[])


      useEffect(() => {
        const location = async () =>{
           let {status} = await Location.requestPermissionsAsync()
            if (status !== 'granted') {
              setError('Permission to access location was denied');
            }
               
        let  watchid =await Location.watchPositionAsync(options,success)        
            setWatchid(watchid)
        }

          location()
          
            return function cleanup(){
              if(watchid)
              watchid.remove()
              console.log("cleaned upffff");
              
            };
        
      }, [markers]);

        let text = 'Waiting..';
        if (error) {
          text = error;
        } else if (position) {
          text = JSON.stringify(position);
        }

      
   
    
    
    const options = {
      accuracy: Location.Accuracy.BestForNavigation,
      timeInterval : 1000,
      distanceInterval:5
    };
        
        

        

    return (
        <View style = {styles.container}>
           <Text> Crosswalks </Text>
            {isLoadingCrosswalks ? (
        <Text>Loading...</Text>
      ) : (
        <MapView
            style = {styles.mapStyle}
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
                })}<Marker    
                key ={"me"}
                        coordinate={position}
                        title = {"me"}
          >
          </Marker>        
            </MapView>
      )}
        </View>
    
    )
}

