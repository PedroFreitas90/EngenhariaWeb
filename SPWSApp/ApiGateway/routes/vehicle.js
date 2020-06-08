var express = require('express');
var router = express.Router();
var axios = require('axios')
var domain = 'localhost'
var port = '3002'

const vehicleUrl = 'http://vehicle:3003/vehicles';

/* GET lista de vehicles. */
router.get('/', function(req, res, next) {
  axios.get(vehicleUrl)
    .then(data => {
      res.jsonp(data.data)
    })
    .catch(erro => {
      res.status(500).send(erro)
    })
});

router.post('/', function(req,res){
  axios.post(vehicleUrl,req.body)
    .then(data => res.jsonp(data.data))
    .catch(erro => res.status(500).send(erro))
});

router.get('/:id', function(req,res){
  axios.get(vehicleUrl.concat('/'.concat(req.params.id)))
    .then(data=> res.jsonp(data.data))
    .catch(erro => res.status(500).send(erro))
});

router.put('/:id', function(req,res){
  axios.put(vehicleUrl.concat('/'.concat(req.params.id)),req.body)
    .then(data => res.jsonp(data.data))
    .catch(erro => res.status(500).send(erro))
});

router.delete('/:id', function(req,res){
  axios.delete(vehicleUrl.concat('/'.concat(req.params.id)))
    .then(data => res.jsonp(data.data))
    .catch(erro => res.status(500).send(erro))
});

module.exports = router;
