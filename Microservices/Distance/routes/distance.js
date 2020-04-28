var express = require('express');
var router = express.Router();
var distance = require ("../logic/calculateDistance")
var axios = require('axios')

/* GET home page. */
router.post('/pedestrian',async function(req, res, next) {
  var crosswalks = req.body.crosswalks
  var pedestrian = req.body.pedestrian
  var idPedestrian = req.body.idPedestrian

  let response = await distance.isNearCrosswalk(crosswalks,pedestrian) // sync para esperar o resultado R: true/False
  response.idPedestrian = idPedestrian
  response.pedestrian = pedestrian
  console.log(response)

  let information = await axios.post("http://localhost:9090/sharelocation",{
    response
  }) 
  
  if(response)
    res.jsonp(response)

  else
    res.jsonp(false)
});

module.exports = router;
