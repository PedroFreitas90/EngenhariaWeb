var express = require('express');
var router = express.Router();
var Vehicle= require('../controllers/vehicles')


/* GET home page. */
router.get('/', function(req, res, next) {
  Vehicle.getAll()
  .then(data=> {res.jsonp(data)})
  .catch(err => res.status(500).send)
});

router.get('/:id', function(req, res, next) {
    Vehicle.getByID(req.params.id)
    .then(data=> {
      console.log(data)
      res.jsonp(data)
    })
    .catch(err => res.status(500).send)
  });
  
  


module.exports = router;
