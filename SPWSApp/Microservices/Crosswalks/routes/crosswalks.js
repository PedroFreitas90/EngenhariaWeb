var express = require('express');
var router = express.Router();
var Crosswalk = require('../controllers/crosswalks')
var axios = require('axios')



/* GET home page. */
router.get('/', function(req, res, next) {
  axios.get('http://localhost:3004/Crosswalks')
  .then(data=> {
    res.jsonp(data.data)
  })
  .catch(err => res.status(500).send)
});

module.exports = router;
