var express = require('express');
var router = express.Router();
var Crosswalk = require('../controllers/crosswalks');
var HistoricPedestrian = require('../controllers/historicPedestrian');
var HistoricVehicle = require('../controllers/historicVehicle');
var CrosswalkPedestrian = require('../controllers/crosswalkPedestrianRT');
var CrosswalkVehicle = require('../controllers/crosswalkVehicleRT');



// GETs
/*

Crosswalks

*/
/* GET all crosswalks. */
router.get('/', function(req, res, next) {
  Crosswalk.getAll()
  .then(data=> {
    console.log(data)
    res.jsonp(data)
  })
  .catch(err => res.status(500).send)
});

/* GET /crosswalks/historic */
router.get('/Historic/Pedestrian', function(req,res){
  idPed = req.query.idPed;
  idCross = req.query.idCross;
  day = req.query.day;
  HistoricPedestrian.findHistoricPedestrian(idPed,idCross,day)
    .then(data => {
      console.log(data);
      res.jsonp(data);
    })
    .catch(err => res.status(500).send)
});

router.get('/Historic/Vehicle', function(req,res){
  idVeh = req.query.idVeh;
  idCross = req.query.idCross;
  day = req.query.day;
  HistoricVehicle.findHistoricVehicle(idVeh,idCross,day)
    .then(data => {
      console.log(data);
      res.jsonp(data);
    })
    .catch(err => res.status(500).send)
});

/*

  CROSSWALKS/PEDESTRIAN

*/
  
router.get('/Pedestrian',function(req,res){
  if( req.query.idCrosswalk){  
  CrosswalkPedestrian.findPedestrianInCrosswalk(req.query.idCrosswalk)
    .then(data => {
      console.log(data);
      res.jsonp(data);
    })
    .catch(err => res.status(500).send)
  }
    else
    res.jsonp([])
  })


/*

CROSSWALKS/VEHICLE

*/

router.get('/Vehicle', function(req,res) {
  if( req.query.idCrosswalk){  
    CrosswalkVehicle.findVehicleInCrosswalk(req.query.idCrosswalk)
    .then(data => {
      console.log(data);
      res.jsonp(data);
    })
    .catch(err => res.status(500).send)
  }
  else
  res.jsonp([])
  })


/* GET crosswalks/:id/state */
router.get('/:id/State', function(req,res,next) {
  Crosswalk.getState(req.params.id)
  .then(data => {
    console.log(data);
    res.jsonp(data);
  })
  .catch(err => res.status(500).send)
});
router.get('/:id', function(req,res,next) {
  Crosswalk.getByID(req.params.id)
    .then(data => {
      console.log(data);
      res.jsonp(data);
    })
    .catch(err => res.status(500).send)
});



router.put('/Pedestrian', function(req,res) {
  id = req.body.idPedestrian;
  idCross = req.body.idCrosswalk;
  location = req.body.location;
  dist = req.body.distance;
  timestamp = req.body.timestamp;
  CrosswalkPedestrian.updateCrosswalkPedestrianRT(id,idCross,location,dist,timestamp)
    .then(data => {
      console.log(data);
      res.jsonp(data);
    })
    .catch(err => res.status(500).send)
});


router.put('/Vehicle', function(req,res) {
  id = req.body.idVehicle;
  idCross = req.body.idCrosswalk;
  location = req.body.location;
  dist = req.body.distance;
  timestamp = req.body.timestamp;
  CrosswalkVehicle.updateCrosswalkVehicleRT(id,idCross,location,dist,timestamp)
    .then(data => {
      console.log(data);
      res.jsonp(data);
    })
    .catch(err => res.status(500).send)
});




/* POST /crosswalks/historic/Pedestrian */
router.post('/Historic/Pedestrian', function(req,res){
  HistoricPedestrian.createHistoricPedestrian(req.body)
  .then(data => {
    console.log(data);
    res.jsonp(data);
  })
  .catch(err => res.status(500).send)
});



router.post('/Historic/Vehicle', function(req,res){
  HistoricVehicle.createHistoricVehicle(req.body)
    .then(data => {
      console.log(data);
      res.jsonp(data);
    })
    .catch(err => res.status(500).send)
});






router.post('/Pedestrian', function(req,res){
  CrosswalkPedestrian.createCrosswalkPedestrianRT(req.body)
    .then(data => {
      console.log(data);
      res.jsonp(data);
    })
    .catch(err => res.status(500).send)
});



router.post('/Vehicle', function(req,res){
  CrosswalkVehicle.createCrosswalkVehicleRT(req.body)
    .then(data => {
      console.log(data);
      res.jsonp(data);
    })
    .catch(err => res.status(500).send)
});




router.delete('/Pedestrian/:id', function(req,res) {
  CrosswalkPedestrian.deleteCrosswalkPedestrianRT(req.params.id)
    .then(data => {
      console.log(data);
      res.jsonp(data);
    })
    .catch(err => res.status(500).send)
});


router.delete('/Vehicle/:id', function(req,res) {
  CrosswalkVehicle.deleteCrosswalkVehicleRT(req.params.id)
    .then(data => {
      console.log(data);
      res.jsonp(data);
    })
    .catch(err => res.status(500).send)
});




module.exports = router;
