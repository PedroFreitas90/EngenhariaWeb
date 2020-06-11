import L from 'leaflet';

const iconPerson =  new L.Icon({
    iconUrl: require('./icons/marker-icon-gold.png'),
    iconRetinaUrl: require('./icons/marker-icon-gold.png'),
    iconAnchor: null,
    popupAnchor:  [-3, -76],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(25, 30),  
    className: 'leaflet-div-icon'
});


const iconMarker = new L.Icon({
    iconUrl: require('./icons/passadeira.bmp'),
    iconRetinaUrl: require('./icons/passadeira.bmp'),
    iconAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(25, 25), 
    popupAnchor:  [-3, -76],
    className: 'leaflet-div-icon'
});
 

const iconCar = new L.Icon({
    iconUrl: require('./icons/taxi.bmp'),
    iconRetinaUrl: require('./icons/taxi.bmp'),
    iconAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(25, 30), 
    popupAnchor:  [-3, -76],
    className: 'leaflet-div-icon'
});

export { iconMarker, iconPerson, iconCar };