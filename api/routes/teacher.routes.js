const router = require('express').Router()
const {checkRole, checkAuth} = require('../middlewares/auth.middleware')
const { getAllTeachers, getOneTeacher, updateTeacher, deleteTeacher   } = require('../controllers/teacher.controller')


router.get('/', checkAuth,(req,res,next)=>{checkRole(req, res,next,["admin","student"])}, getAllTeachers)
router.get('/:id', (req,res,next)=> {checkRole(req, res,next,["admin","student"])},  getOneTeacher)
router.put('/:id', (req,res,next)=> {checkRole(req, res,next,["admin"])},  updateTeacher)
router.delete('/:id', (req,res,next)=> {checkRole(req, res,next,["admin"])},  deleteTeacher)


module.exports = router