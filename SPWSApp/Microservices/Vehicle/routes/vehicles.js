var express = require('express');
var router = express.Router();
var Vehicle= require('../controllers/vehicles')


/* GET home page. */
router.get('/', function(req, res, next) {
  Vehicle.getAll()
  .then(data=> {res.jsonp(data)})
  .catch(erro => res.status(500).send(erro))
});

router.get('/:id', function(req, res, next) {
    Vehicle.getByID(req.params.id)
    .then(data=> {
      console.log(data)
      res.jsonp(data)
    })
    .catch(erro => res.status(500).send(erro))
  });
 
router.post('/', function(req,res){
  Vehicle.getAll()
    .then(data=>{
      let max = 0;
      data.forEach(vehicle => {
        if(parseInt(vehicle.idVehicle) > max)
          max = parseInt(vehicle.idVehicle);
      })
      vehicle = {}
      vehicle.idVehicle = (max + 1).toString();
      vehicle.latitude = req.body.latitude;
      vehicle.longitude = req.body.longitude;
      vehicle.timestamp = Math.floor(Date.now() / 1000);
      Vehicle.createVehicle(vehicle)
        .then(data => {res.jsonp(data)})
        .catch(erro => {
          console.log(erro)
          res.status(500).send(erro)
        })
    })
    .catch(erro => {
      console.log(erro);
      return -1
    });
});

router.delete('/:id', function(req,res){
  Vehicle.deleteVehicle(req.params.id)
    .then(data => res.jsonp(data))
    .catch(erro => res.status(500).send(erro));
});


router.put('/:id', function(req,res){
  id =req.params.id;
  latitude = req.body.latitude;
  longitude = req.body.longitude;
  timestamp = Math.floor(Date.now() / 1000);
  Vehicle.updateVehicle(id,latitude,longitude,timestamp)
    .then(data => res.jsonp(data))
    .catch(erro => res.jsonp(erro))
});


module.exports = router;
