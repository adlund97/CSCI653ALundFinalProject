const express = require('express')
const router = express.Router()
const {
    getStates,
    setStates,
    updateStates,
    deleteStates 
} = require('../controllers/stateController')

router.route('/').get(getStates).post(setStates)
router.route('/:id').patch(updateStates).delete(deleteStates)

module.exports = router