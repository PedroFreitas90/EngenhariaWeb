import {distancePedestrian } from "./api/crosswalks";
import * as Location from 'expo-location';


const options = {
    accuracy: Location.Accuracy.BestForNavigation,
    timeInterval : 1000,
    distanceInterval:30
  };
      
      
var watchid







  export const mylocation = (setPosition,markers) => {


    let {status} = Location.requestPermissionsAsync()
     if (status !== 'granted') {
       
     }
        
 let  watchID = Location.watchPositionAsync(options,(pos) =>{
    console.log(markers)
    const location = {
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      }
      setPosition({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      })
        if(markers.length>0)
      distancePedestrian(markers,location,10)
      .then((isNear) => {})
          
 })        
     watchID =watchid
 }

 export const removeWatchID = () =>{
    if(watchid)
    watchid.remove()
}




