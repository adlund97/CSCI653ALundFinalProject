const path = require('path')
const data = {}
data.states = require('../models/statesData.json')
data.codes = data.states.map((state) => state.code)

const verifyStates = (req, res, next) => {
    result = req.params.state.toUpperCase()
    req.code = data.codes.find(element => element == result)
    if (req.code == undefined) {
        res.status(404).json({ "message": "Invalid state abbreviation parameter" })
    }
    next()
}

module.exports = { verifyStates }