import React,{useState, useEffect,} from 'react';
import { getCrosswalks} from "./src/api/crosswalks";
import MapView, {Marker} from 'react-native-maps'
import {Image,View,Text } from 'react-native'
import { mylocation, removeWatchID } from "./src/location"
import {styles} from "./src/style"
import  PubNub  from "pubnub";
import Constants from 'expo-constants';



const uuid = PubNub.generateUUID();
const identifier = Constants.installationId

const pubnub = new PubNub({
  publishKey: "pub-c-627ad9bf-507f-4fae-9a30-6fb40d8eff88",
  subscribeKey: "sub-c-2bc1178c-8e5e-11ea-927a-2efbc014b69f",
  uuid: uuid,
  
});



export default function Map (){
    const [markers, setMarkers] = useState([]);
    const [isLoadingCrosswalks, setIsLoadingCrosswalks] = useState(false);
    const [position , setPosition] =useState({latitude : 0 , longitude :0})

    const publishConfig = {
        channel: "API WEBSOCKETS",
         message :{idVehicle: identifier}
      }
      
    //const uniqueId = getUniqueId()
 
      useEffect(()=>{
        getCrosswalks().then((crosswalks) => {
          setMarkers(crosswalks);
          console.log(crosswalks)
          setIsLoadingCrosswalks(false);
        })
        
        pubnub.publish(publishConfig, function(status, response) {
          console.log(status, response);
        });


        pubnub.addListener({
          message: function(message) {
              console.log(message)
              alert(message.message);
            }
        })

        pubnub.subscribe({
        channels :[uuid],
        withPresence :true
      });

      return () => {
        pubnub.unsubscribeAll();
      };
        
      },[pubnub])


      useEffect(() => {
         mylocation(setPosition,markers,identifier)
            return function cleanup(){
              removeWatchID()
              console.log("cleaned upffff");
            };
        
      }, [markers]);


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
               {markers.map(({ latitude, longitude, title, _id }) => {
                  return (
                    <Marker key ={_id}
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
                  <Image style = {styles.crosswalk}
                  source={require('./assets/taxi.bmp')} >
                  </Image>      
          </Marker>        
            </MapView>
      )}
        </View>
    
    )
}

