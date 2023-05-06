const mongoose = require('mongoose')

const stateSchema = mongoose.Schema({
    text: {
        type: String,
        required: true,
        unique: true
    }
})

module.exports = mongoose.model('State', stateSchema)