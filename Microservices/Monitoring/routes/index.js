var express = require('express');
var router = express.Router();
var crosswalkRT = require('../logic/logic')

/* GET home page. */
router.get('/',function(req, res, next) {
  results = crosswalkRT.seletc(function(location){
    console.log(location)
    res.jsonp(location)
  })
  
 // res.render('index', { title: 'Express' });
});



/* GET home page. */
router.post('/', function(req, res, next) {
  crosswalkRT.verifyPosition(req.body)
  res.jsonp(req.body)
  

  //res.render('index', { title: 'Express' });
});






module.exports = router;
