const express = require('express')
const router = express.Router()
const { verifyStates } = require('../middleware/verifyStates')
const {
    getStates,
    setStates,
    updateStates,
    deleteStates 
} = require('../controllers/stateController')

router.route('/', verifyStates).get(getStates).post(setStates)
router.route('/:state').patch(updateStates).delete(deleteStates)

module.exports = router