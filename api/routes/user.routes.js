const router =require('express').Router()
const {getAllUsers, getUser, deleteUser, updateUser} = require('../controllers/user.controller.js')

router.get('/', getAllUsers)
router.get('/:userId', getUser)
router.delete('/deleteUser/:userId', deleteUser)
router.put('/updateUser/:userId', updateUser)

module.exports= router