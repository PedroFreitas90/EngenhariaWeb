var express = require('express');
var router = express.Router();
import isNearCrosswalk from "../logic"

/* GET home page. */
router.post('/pedestrian', function(req, res, next) {
  var crosswalks = req.body.crosswalks
  var pedestrian = req.body.pedestrian
  isNearCrosswalk(crosswalks,pedestrian)
  res.jsonp(crosswalks);
});

module.exports = router;
