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



