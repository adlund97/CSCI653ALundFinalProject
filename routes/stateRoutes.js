const express = require('express')
const router = express.Router()

//Custom middleware functions for checking and using the stateData file information
const { verifyStates } = require('../middleware/verifyStates')
const { checkContig } = require('../middleware/checkContig')

//Controller to send proper data back to client
const {
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
} = require('../controllers/stateController')

router.route('/').get(checkContig, getStates)
router.route('/:state').get(verifyStates, getSingleState)
router.route('/:state/funfact').get(verifyStates, getFunfact).post(verifyStates, setFunfact).patch(verifyStates, patchFunfact).delete(verifyStates, deleteFunfact)
router.route('/:state/capital').get(verifyStates, getCapital)
router.route('/:state/nickname').get(verifyStates, getNickname)
router.route('/:state/population').get(verifyStates, getPoplulation)
router.route('/:state/admission').get(verifyStates, getAdmission)


module.exports = router