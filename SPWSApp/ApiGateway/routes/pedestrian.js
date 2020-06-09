var express = require('express');
var router = express.Router();
var axios = require('axios')
var domain = 'localhost'
var port = '3002'

const pedestrianUrl = 'http://pedestrian:3001/pedestrians';

/* GET lista de pedestrians. */
router.get('/', function(req, res, next) {
  axios.get(pedestrianUrl)
    .then(data => {
      res.jsonp(data.data)
    })
    .catch(erro => {
      res.status(500).send(erro)
    })
});

router.post('/', function(req,res){
  axios.post(pedestrianUrl,req.body)
    .then(data => res.jsonp(data.data))
    .catch(erro => res.status(500).send(erro))
});

router.get('/:id', function(req,res){
  axios.get(pedestrianUrl.concat('/'.concat(req.params.id)))
    .then(data=> res.jsonp(data.data))
    .catch(erro => res.status(500).send(erro))
});

router.put('/:id', function(req,res){
  axios.put(pedestrianUrl.concat('/'.concat(req.params.id)),req.body)
    .then(data => res.jsonp(data.data))
    .catch(erro => res.status(500).send(erro))
});

router.delete('/:id', function(req,res){
  axios.delete(pedestrianUrl.concat('/'.concat(req.params.id)))
    .then(data => res.jsonp(data.data))
    .catch(erro => res.status(500).send(erro))
});

module.exports = router;