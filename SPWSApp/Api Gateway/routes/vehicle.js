var express = require('express');
var router = express.Router();
var axios = require('axios')
var domain = 'localhost'
var port = '3002'

const crosswalkUrl = 'http://localhost:3002/crosswalks';

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

router.post('/', function(req,res){
  cw = req.body;
  axios.post(crosswalkUrl,cw)
    .then(data => res.jsonp(data.data))
    .catch(erro => res.status(500).send(erro))
});

router.get('/:id', function(req,res){
  axios.get(crosswalkUrl.concat('/'.concat(req.params.id)))
    .then(data=> res.jsonp(data.data))
    .catch(erro => res.status(500).send(erro))
});

router.put('/:id', function(req,res){
  cw = req.body;
  axios.put(crosswalkUrl.concat('/'.concat(req.params.id)),cw)
    .then(data => res.jsonp(data.data))
    .catch(erro => res.status(500).send(erro))
});

module.exports = router;
