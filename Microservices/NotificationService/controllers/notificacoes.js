var Notification = require('../models/notificacoes');

//Devolver a lista de todas as notificações
module.exports.list = () => {
    return Notification
        .find()
        .exec()
}

//Devolver as notificações de um veículo
module.exports.listVehNots = idVeh => {
    return Notification
        .find({idVehicle: idVeh})
        .exec()
}

//Devolver uma notificação
module.exports.consult = idNot => {
    return Notification
        .find({_id: idNot})
        .exec()
}

//Cria uma notificação
module.exports.insert = not => {
    var novo = new Notification(not)
    return novo.save()
}