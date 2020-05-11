var express = require('express');
var router = express.Router();
var CrosswalkPedestrian = require('../controllers/crosswalkPedestrianRT')
var CrosswalkVehicle = require('../controllers/crosswalkVehicleRT')


/*

/MONITORING/PEDESTRIAN

*/
router.get('/Pedestrian/:id', function(req,res){
  if(req.query.idCross){
    CrosswalkPedestrian.findPedestrianInCrosswalk(req.params.id,req.query.idCross)
      .then(data => {
        console.log(data);
        res.jsonp(data);
      })
      .catch(err => res.status(500).send)
  }
  else{
    CrosswalkPedestrian.findPedestrian(req.params.id)
      .then(data => {
        console.log(data);
        res.jsonp(data);
      })
      .catch(err => res.status(500).send)
  }
});

/*

/MONITORING/PEDESTRIAN

*/
router.get('/Vehicle/:id', function(req,res){
  if(req.query.idCross){
    CrosswalkVehicle.findVehicleInCrosswalk(req.params.id, req.query.idCross)
      .then(data => {
        console.log(data);
        res.jsonp(data);
      })
      .catch(err => res.status(500).send)
  }
  else{
    CrosswalkVehicle.findVehicle(req.params.id)
      .then(data => {
        console.log(data);
        res.jsonp(data);
      })
      .catch(err => res.status(500).send)
  }
});

module.exports = router;
