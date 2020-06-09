var express = require('express');
var router = express.Router();
var axios = require('axios')
var domain = 'localhost'
var port = '3002'

const crosswalkUrl = 'http://crosswalk:3002/crosswalks';

/* GET lista de crosswalks. */
router.get('/', function(req, res, next) {
  axios.get(crosswalkUrl)
    .then(data => {
      res.jsonp(data.data)
    })
    .catch(erro => {
      res.status(500).send(erro)
    })
});

/* GET pedestrians in crosswalk RT. */
router.get('/Pedestrian/:id', function(req, res, next) {
  axios.get(crosswalkUrl.concat('/Pedestrian?idCrosswalk='.concat(req.params.id)))
    .then(data => {
      res.jsonp(data.data)
    })
    .catch(erro => {
      res.status(500).send(erro)
    })
});

/* GET vehicle in crosswalk RT. */
router.get('/Vehicle/:id', function(req, res, next) {
  axios.get(crosswalkUrl.concat('/Vehicle?idCrosswalk='.concat(req.params.id)))
    .then(data => {
      res.jsonp(data.data)
    })
    .catch(erro => {
      res.status(500).send(erro)
    })
});


/* GET historic vehicle in crosswalk. */
router.get('/Historic/Vehicle/:id', function(req, res, next) {
  axios.get(crosswalkUrl.concat('/Historic/Vehicle?idCross='.concat(req.params.id)))
    .then(data => {
      res.jsonp(data.data)
    })
    .catch(erro => {
      res.status(500).send(erro)
    })
});



/* GET historic pedestrian in crosswalk. */
router.get('/Historic/Pedestrian/:id', function(req, res, next) {
  axios.get(crosswalkUrl.concat('/Historic/Pedestrian?idCross='.concat(req.params.id)))
    .then(data => {
      res.jsonp(data.data)
    })
    .catch(erro => {
      res.status(500).send(erro)
    })
});






router.get('/:id', function(req,res){
  axios.get(crosswalkUrl.concat('/'.concat(req.params.id)))
    .then(data=> res.jsonp(data.data))
    .catch(erro => res.status(500).send(erro))
});

router.post('/', function(req,res){
  axios.post(crosswalkUrl,req.body)
    .then(data => res.jsonp(data.data))
    .catch(erro => res.status(500).send(erro))
});


router.put('/:id', function(req,res){
  axios.put(crosswalkUrl.concat('/'.concat(req.params.id)),req.body)
    .then(data => res.jsonp(data.data))
    .catch(erro => res.status(500).send(erro))
});




module.exports = router;
