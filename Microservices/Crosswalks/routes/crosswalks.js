var express = require('express');
var router = express.Router();
var Crosswalk = require('../controllers/crosswalks')



/* GET home page. */
router.get('/', function(req, res, next) {
  Crosswalk.getAll()
  .then(data=> {
    console.log(data)
    res.jsonp(data)
  })
  .catch(err => res.status(500).send)
});

module.exports = router;
