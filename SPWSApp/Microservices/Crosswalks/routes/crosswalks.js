var express = require('express');
var router = express.Router();
var Crosswalk = require('../controllers/crosswalks')
var axios = require('axios')
var crosswalkUrl =  'http://localhost:3004/Crosswalks'

/* GET all crosswalks. */
router.get('/', function(req, res, next) {
  axios.get(crosswalkUrl)
  .then(data=> {
    res.jsonp(data.data)
  })
  .catch(err => res.status(500).send)
});

router.post('/', function(req,res){
  axios.post(crosswalkUrl,req.body)
    .then(data => res.jsonp(data.data))
    .catch(erro => res.status(500).send(erro))
});

router.get('/:id', function(req,res){
  axios.get(crosswalkUrl.concat('/'.concat(req.params.id)))
    .then(data => res.jsonp(data.data))
    .catch(erro => res.status(500).send(erro))
})

router.put('/:id', function(req,res){
  axios.put(crosswalkUrl.concat('/'.concat(req.params.id)),req.body)
    .then(data => res.jsonp(data.data))
    .catch(erro => res.status(500).send(erro))
});



module.exports = router;
