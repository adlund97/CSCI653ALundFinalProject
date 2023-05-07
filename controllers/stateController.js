const State = require('../models/stateModel')
data = {}
data.states = require('../models/statesData.json')


async function addFacts(stateInfo) {
    result = stateInfo
    facts = await State.find({}).exec()
    result.forEach(state => {
        thisState = facts.find(doc => doc.stateCode == state.code)
        if (thisState != undefined) {
            if (thisState.funfacts != undefined) {
                state["funfacts"] = thisState.funfacts
            }
        }
    })
    return result
}

// -------------------------------------------GETS
// desc:    Gets States information
// route:   GET /api/states
const getStates = async (req, res) => {
    if (req.query.contig != undefined) {
        result = await addFacts(req.filteredStates)
    } else {
        result = await addFacts(data.states)
    }
    res.status(200).json(result)
}

// desc:    Gets Single State information
// route:   GET /api/states/:state
const getSingleState = async (req, res) => {
    result = await addFacts(data.states.filter(element => (element.code == req.code)))
    res.status(200).json(result)
}

// desc:    Gets Funfact from a state
// route:   GET /api/states/:state/funfact
const getFunfact = async (req, res) => {
    result = await State.findOne({ stateCode: req.code }).exec()
    if (result != undefined && result.funfacts != undefined) {
        randomFact = Math.floor(Math.random() * result.funfacts.length)
        res.status(200).json(result.funfacts[randomFact])
        return
    } else {
        none = data.states.find(element => element.code == req.code)
        res.status(404).json( {'message': `No Fun Facts found for ${none.state}`} )
        return
    }
}

// desc:    Gets Capital info from a state
// route:   GET /api/states/:state/capital
const getCapital = async (req, res) => {
    result = data.states.filter(element => (element.code == req.code))
    capital = {"state": `${result[0].state}`, "capital": `${result[0].capital_city}`}
    res.status(200).json(capital)
}

// desc:    Gets Nickname info from a state
// route:   GET /api/states/:state/nickname
const getNickname = async (req, res) => {
    result = data.states.filter(element => (element.code == req.code))
    nickname = {"state": `${result[0].state}`, "nickname": `${result[0].nickname}`}
    res.status(200).json(nickname)
}

// desc:    Gets Admission info from a state
// route:   GET /api/states/:state/population
const getPoplulation = async (req, res) => {
    result = data.states.filter(element => (element.code == req.code))
    population = {"state": `${result[0].state}`, "population": `${result[0].population}`}
    res.status(200).json(population)
}

// desc:    Gets Single State information
// route:   GET /api/states/:state/admission
const getAdmission = async (req, res) => {
    result = data.states.filter(element => (element.code == req.code))
    admission = {"state": `${result[0].state}`, "admitted": `${result[0].admission_date}`}
    res.status(200).json(admission)
}


// -------------------------------------------POST
// desc:    Creates State information
// route:   POST /api/states/:state/funfact
const setFunfact = async (req, res) => {
    if (!req?.body?.funfacts) {
        res.status(404).json({ 'message': 'State fun facts value required' })
        return
    }
    if (!Array.isArray(req.body.funfacts)) {
        res.status(404).json({ 'message': 'State fun facts value must be an array' })
        return
    }

    try {
        facts = await State.create({ stateCode: req.code, funfacts: req.body.funfacts })
    } catch (e) {
        facts = await State.findOne({ stateCode: req.code }).exec()
        req.body.funfacts.forEach((fact) => {facts.funfacts.push(fact)})
        await facts.save()
    }
    res.status(200).json(facts)
}


// -------------------------------------------PATCH
// desc:    Updates States information
// route:   PATCH /api/states/:state/funfact
const patchFunfact = async (req, res) => {
    if (!req?.body?.index) {
        res.status(404).json({ 'message': 'State fun fact index value required' })
    }
    if (!req?.body?.funfact) {
        res.status(404).json({ 'message': 'State fun fact value required' })
    }

    facts = await State.findOne({ stateCode: req.code }).exec()
    result = facts.funfacts[req.body.index - 1]
    if (result != undefined) {
        facts.funfacts[req.body.index - 1] = req.body.funfact
        await facts.save()
    } else {
        none = data.states.find(element => element.code == req.code)
        res.status(404).json({ 'message': `No Fun Fact found at that index for ${none.state}` })
    }
    res.status(200).json(facts)
}


// -------------------------------------------DELETE
// desc:    Deletes States information
// route:   DELETE /api/states/:state/funfact
const deleteFunfact = async (req, res) => {
    if (!req?.body?.index) {
        res.status(400).json({ 'message': 'State fun fact index value required' })
    }

    const facts = await State.findOne({ stateCode: req.code }).exec()
    result = facts.funfacts[req.body.index - 1]
    if (result != undefined) {
        facts.funfacts = facts.funfacts.filter(element => (element != result))
        await facts.save()
    } else {
        none = data.states.find(element => element.code == req.code)
        res.status(404).json({ 'message': `No Fun Fact found at that index for ${none.state}` })
    }
    res.status(200).json(facts)
}

module.exports = {
    getStates,
    getSingleState,
    getFunfact,
    getCapital,
    getNickname,
    getPoplulation,
    getAdmission,
    setFunfact,
    patchFunfact,
    deleteFunfact
}