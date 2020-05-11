var express = require('express');
var router = express.Router();
var axios = require('axios')
var domain = 'localhost'
var port = '3002'

/* GET home page. */
router.get('/', function(req, res, next) {
  axios.get(`http://${domain}:${port}/crosswalks`)
  .then(data => {
    res.jsonp(data.data)
  })
  .catch(erro => {
    res.status(500).send(erro)
  })
});

module.exports = router;
