var Crosswalk = require('../models/crosswalks')

module.exports.getState = id => {
    return Crosswalk.find ({_id : id} , {state : 1})
}
