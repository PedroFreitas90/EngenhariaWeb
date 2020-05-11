var express = require('express');
var router = express.Router();
var Crosswalk = require('../controllers/crosswalks')
var axios = require('axios')



/* GET home page. */
router.get('/', function(req, res, next) {
  axios.get('localhost:3333/Crosswalks')
  .then(data=> {
    console.log(data)
    res.jsonp(data)
  })
  .catch(err => res.status(500).send)
});

module.exports = router;
