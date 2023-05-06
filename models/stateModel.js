const mongoose = require('mongoose')

const stateSchema = mongoose.Schema({
    stateCode: {
        type: String,
        required: true,
        unique: true
    },
    funfacts: {
        type: [String]
    }
})

module.exports = mongoose.model('State', stateSchema)