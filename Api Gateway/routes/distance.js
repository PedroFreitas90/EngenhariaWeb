var express = require('express');
var router = express.Router();
var rabbitMQ= require('../RabbitMQ')

/* GET home page. */
router.post('/pedestrian', function(req, res, next) {
  rabbitMQ.publish("distance.pedestrian",req.body)
    res.jsonp(true)
});

/* GET home page. */
router.post('/vehicle', function(req, res, next) {
  rabbitMQ.publish("distance.vehicle",req.body)
    res.jsonp(true)
});



module.exports = router;
