var express = require('express');
var router = express.Router();

var crosswalks = {
  crosswalks: [{
    id : 1,
    title: "Casa da Música",
    latitude: 41.1589,
    longitude: -8.6307,
    state : "RED"
  },
  {
    id : 2,
    title: "Torre de Belém",
    latitude: 38.6916,
    longitude: -9.216,
    state : "GREEN"
  },
  {
    id : 3,
    title: "Cabo da Roca",
    latitude: 38.7804,
    longitude: -9.4989,
    state : "YELLOW"
  }]
}


/* GET home page. */
router.get('/', function(req, res, next) {
  res.jsonp(crosswalks)
});

module.exports = router;
