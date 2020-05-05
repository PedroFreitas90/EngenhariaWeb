const PubNub = require('pubnub');
const uuid = PubNub.generateUUID();
var Connection =  require('./controllers/connection')



const pubnub = new PubNub({
  publishKey: "pub-c-627ad9bf-507f-4fae-9a30-6fb40d8eff88",
  subscribeKey: "sub-c-2bc1178c-8e5e-11ea-927a-2efbc014b69f",
  uuid: uuid
});



pubnub.addListener({
  message: function(message) {
    let id = message.idVehicle
      Connection.findConnection(id)
      .then (res => {
           if (res.length > 0)
            Connection.updateConnection(id,message.publisher)
            else
            Connection.createConnection(id,message.publisher) 
      })
  },
  presence: function(userEvent) {
      console.log(userEvent)
      
  }

})


pubnub.subscribe({
  channels: ["API WEBSOCKETS"],
  withPresence :true
});

