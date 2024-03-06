const router =require('express').Router()
const {getAllUsers, getUser, deleteUser, updateUser} = require('../controllers/user.controller.js')
const {checkRole, checkAuth} = require('../middlewares/auth.middleware')

router.get('/', checkAuth,(req,res,next)=>{checkRole(res,res,next,["admin"])}, getAllUsers)
router.get('/:userId', checkAuth,(req,res,next)=>{checkRole(res,res,next,["admin"])}, getUser)
router.delete('/:userId', checkAuth,(req,res,next)=>{checkRole(res,res,next,["admin"])}, deleteUser)
router.put('/:userId', checkAuth,(req,res,next)=>{checkRole(res,res,next,["admin"])}, updateUser)

module.exports= router