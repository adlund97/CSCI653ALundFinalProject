const State = require('../models/stateModel')

// desc:    Gets States information
// route:   GET /api/states
// access:  Private
const getStates = async (req, res) => {
    res.status(200).json({ message: 'Get States' })
}

// desc:    Creates State information
// route:   POST /api/states
// access:  Private
const setStates = async (req, res) => {
    res.status(200).json({ message: 'Create States' })
}

// desc:    Updates States information
// route:   PATCH /api/states
// access:  Private
const updateStates = async (req, res) => {
    res.status(200).json({ message: 'Update States' })
}

// desc:    Deletes States information
// route:   DELETE /api/states
// access:  Private
const deleteStates = async (req, res) => {
    res.status(200).json({ message: 'Delete States' })
}

module.exports = {
    getStates,
    setStates,
    updateStates,
    deleteStates
}