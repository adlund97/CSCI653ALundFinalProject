const verifyStates = (req, res, next) => {
    const data = {}
    data.states = require('../models/statesData.json')
    data.codes = data.states.map((state) => state.code)

    req.code = data.codes
    next()
}

module.exports = { verifyStates }