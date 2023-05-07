const path = require('path')
const data = {}
data.states = require('../models/statesData.json')
data.codes = data.states.map((state) => state.code)

const verifyStates = (req, res, next) => {
    result = req.params.state.toUpperCase()
    req.code = data.codes.find(element => element == result)
    if (req.code == undefined) {
        res.status(404)
        if (req.accepts('html')) {
            res.sendFile(path.join(__dirname, '../views', '404.html'))
            return
        } else if (req.accepts('json')) {
            res.json('error: 404 Not Found')
            return
        } else {
            res.type('txt').send("404 Not Found")
            return
        }
    }
    next()
}

module.exports = { verifyStates }