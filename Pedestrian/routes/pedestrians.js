var express = require('express');
var router = express.Router();
var Pedestrian= require('../controllers/pedestrians')


/* GET home page. */
router.get('/', function(req, res, next) {
  Pedestrian.getAll()
  .then(data=> {res.jsonp(data)})
  .catch(err => res.status(500).send)
});

router.get('/:id', function(req, res, next) {
    Pedestrian.getByID(req.params.id)
    .then(data=> {
      console.log(data)
      res.jsonp(data)
    })
    .catch(err => res.status(500).send)
  });
  
  


module.exports = router;
