var HistoricPedestrian = require('../models/historicPedestrian')


module.exports.createHistoricPedestrian = (info) => {
    var novo = new HistoricPedestrian(info)
    return novo.save()
}

module.exports.findHistoricPedestrian = (idPedestrian , idCrosswalk,day) => {
    return HistoricPedestrian
            .find({idPedestrian:idPedestrian, idCrosswalk:idCrosswalk, day : day})
            .exec()
}
