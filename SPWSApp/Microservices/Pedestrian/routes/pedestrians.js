var express = require('express');
var router = express.Router();
var Pedestrian = require('../controllers/pedestrians')


/* GET home page. */
router.get('/', function(req, res, next) {
  Pedestrian.getAll()
  .then(data=> {res.jsonp(data)})
  .catch(erro => res.status(500).send(erro))
});

router.get('/:id', function(req, res, next) {
    Pedestrian.getByID(req.params.id)
    .then(data=> {
      console.log(data)
      res.jsonp(data)
    })
    .catch(erro => res.status(500).send(erro))
  });
 
router.post('/', function(req,res){
  Pedestrian.getAll()
    .then(data=>{
      let max = 0;
      data.forEach(pedestrian => {
        if(parseInt(pedestrian.idPedestrian) > max)
          max = parseInt(pedestrian.idPedestrian);
      
      })
      pedestrian = {}
      pedestrian.idPedestrian = (max+1).toString();
      pedestrian.latitude = req.body.latitude;
      pedestrian.longitude = req.body.longitude;
      pedestrian.timestamp = Math.floor(Date.now() / 1000);
      Pedestrian.createPedestrian(pedestrian)
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
  Pedestrian.deletePedestrian(req.params.id)
    .then(data => res.jsonp(data))
    .catch(erro => res.status(500).send(erro));
});


router.put('/:id', function(req,res){
  id =req.params.id;
  latitude = req.body.latitude;
  longitude = req.body.longitude;
  timestamp = Math.floor(Date.now() / 1000);
  Pedestrian.updatePedestrian(id,latitude,longitude,timestamp)
    .then(data => res.jsonp(data))
    .catch(erro => res.jsonp(erro))
});


module.exports = router;