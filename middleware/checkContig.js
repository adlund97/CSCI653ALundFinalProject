const data = {}
data.states = require('../models/statesData.json')

const checkContig = (req, res, next) => {
    if (req.query.contig == undefined) {

    } else {
        req.query.contig == 'true' ? result = data.states.filter(element => (element.code != 'AK' && element.code != 'HI')) : result = data.states.filter(element => (element.code == 'AK' || element.code == 'HI'))
        req.filteredStates = result
    }
    next()
}

module.exports = { checkContig }