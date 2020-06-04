var express = require('express');
var router = express.Router();
var Crosswalk = require('../controllers/crosswalks')

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

router.get('/:id', function(req,res){
  Crosswalk.getByID(req.params.id)
    .then(data => res.jsonp(data))
    .catch(erro => res.status(500).send(erro))
})

router.put('/:id', function(req,res){
  timestamp = Math.floor(Date.now() / 1000);
  Crosswalk.updateCrosswalk(req.paramsid,req.body.state,timestamp)
    .then(data => res.jsonp(data))
    .catch(erro => res.status(500).send(erro))
});



module.exports = router;
