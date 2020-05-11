var express = require('express');
var router = express.Router();
var Notification = require('../controllers/notificacoes');
var mongoose = require('mongoose');
const rabbitMQ = require('../RabbitMQ')

/* GET home page. */
router.get('/notifications', function(req,res,next) {
  if(req.query.vid){
    Notification.listVehNots(req.query.vid)
      .then(data => res.jsonp(data))
      .catch(error => res.status(500).jsonp(error))
  }
  else{
    Notification.list()
    .then(data => res.jsonp(data))
    .catch(error => res.status(500).jsonp(error))
  }
});

/* Get notifications/:id */
router.get('/notifications/:id',function(req,res,next) {
  Notification.consult(req.params.id)
    .then(data => res.jsonp(data))
    .catch(error => res.status(500).jsonp(error))
})

/*POST /notifications */
router.post('/notifications', function(req,res) {
  console.log(req.body)
    const notification = {
      idVehicle: req.body.idVehicle,
      trafficLightsState: req.body.trafficLightsState,
      crosswalkState: req.body.crosswalkState,
      timestamp: new Date()
    };
    Notification.insert(notification)
      .then(data=> {
        console.log("Notification saved in database!")
        const alert = makeDecision(notification);
        rabbitMQ.send(alert)
        res.jsonp(data)
      })
      .catch(error => {
        console.log('erro no insert');
        res.status(500).jsonp(error);
      });
});

const makeDecision = not => {
  cwState = not.crosswalkState;
  tfState = not.trafficLightsState;
  let alert = {
    idVehicle: not.idVehicle,
    text: ''
  };
  if(tfState == 'RED'){
    alert.text = 'Do not cross! \n Traffic Light is Red!'
    console.log(alert);
    return alert
  };
  if(tfState == 'GREEN'){
    if(cwState == 'Pedestrian Alert')
      alert.text = 'Do not cross!\n '.concat(cwState); 
    
    if(cwState == 'Safe to cross')
      alert.text = cwState;
    
      console.log(alert);
    return alert;
  };
  if(tfState == 'YELLOW'){
    
    if(cwState == 'Pedestrian Alert')
      alert.text = 'Do not cross!\n '.concat(cwState); 
    
    if(cwState == 'Safe to cross')
      alert.text = 'Be carefull! It\'s yellow!\n'.concat(cwState);
    
    console.log(alert);
    return alert;
  };
};

module.exports = router;
