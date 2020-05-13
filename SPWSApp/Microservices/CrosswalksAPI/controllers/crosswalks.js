var Crosswalk = require('../models/crosswalks')

module.exports.getState = id => {
    return Crosswalk.find ({_id : id} , {state : 1})
}

module.exports.getAll = () => {
    return Crosswalk.find()
}

module.exports.getByID = id => {
    return Crosswalk.find({_id : id})
}

module.exports.createCrosswalk = (info) => {
    var novo = new Crosswalk(info)
    return novo.save()
}

module.exports.updateCrosswalk = (id, state, timestamp) => {
    return Crosswalk
            .updateOne({_id :id },
                {$set :{
                    state : state,
                    timestamp : timestamp            
            } })
            .exec()
}



