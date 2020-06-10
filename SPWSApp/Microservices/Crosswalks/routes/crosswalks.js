var express = require('express');
var router = express.Router();
var Crosswalk = require('../controllers/crosswalks')
var HistoricPedestrian = require('../controllers/historicPedestrian')
var HistoricVehicle = require('../controllers/historicVehicle')
var CrosswalkPedestrian = require('../controllers/crosswalkPedestrianRT')
var CrosswalkVehicle = require('../controllers/crosswalkVehicleRT')

/* GET all crosswalks. */
router.get('/', function(req, res, next) {
  Crosswalk.getAll()
  .then(data=> {
    res.jsonp(data)
  })
  .catch(err => res.status(500).send)
});

router.post('/', function(req,res){
  Crosswalk.createCrosswalk(req.body)
    .then(data => res.jsonp(data))
    .catch(erro => res.status(500).send(erro))
});

router.put('/:id', function(req,res){
  timestamp = Math.floor(Date.now() / 1000);
  Crosswalk.updateCrosswalk(req.params.id,req.body.state,timestamp)
    .then(data => res.jsonp(data))
    .catch(erro => res.status(500).send(erro))
});

/* GET /crosswalks/historic */
router.get('/Historic/Pedestrian', function(req,res){
  idCross = req.query.idCross;
  HistoricPedestrian.findHistoric(idCross)
    .then(data => {
      res.jsonp(data);
    })
    .catch(err => res.status(500).send)
});

router.get('/Historic/Vehicle', function(req,res){
  idCross = req.query.idCross;
  HistoricVehicle.findHistoric(idCross)
    .then(data => {
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


router.get('/:id', function(req,res){
  Crosswalk.getByID(req.params.id)
    .then(data => res.jsonp(data))
    .catch(erro => res.status(500).send(erro))
})



module.exports = router;
