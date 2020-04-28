import { useState, useEffect, useRef } from "react";
import * as Location from 'expo-location';
import {distancePedestrian } from "./src/api/crosswalks";



const options = {
    accuracy: Location.Accuracy.BestForNavigation,
    timeInterval : 200,
    distanceInterval:2
  };
      


const useWatchLocation = () => {
  // store location in state
  const [location, setLocation] = useState();
  // store error message in state
      
  function success(pos) {
    
      setLocation({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      })
   /*   distancePedestrian(markers,location).then((isNear) => {
          if(isNear)
          console.log("SOCKETSSS")
          else {
            console.log("NAO SOCKETSSS")
          }
      })
      */
    }
    

  


      useEffect(() => {

        (async () =>{
          let {status} = await Location.requestPermissionsAsync()
           if (status !== 'granted') {
             setError('Permission to access location was denied');
           }
              
           await Location.watchPositionAsync(options,success)
           })();
         
       
  
      return { location }

},[options])

}
export default useWatchLocation;