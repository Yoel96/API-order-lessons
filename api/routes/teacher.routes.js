const router = require('express').Router()
const {checkRole, checkAuth} = require('../middlewares/auth.middleware')
const { getAllTeachers, getOneTeacher, updateTeacher, deleteTeacher, getTeachersBySubject   } = require('../controllers/teacher.controller')


router.get('/', checkAuth,(req,res,next)=>{checkRole(req, res,next,["admin","student"])}, getAllTeachers)
router.get('/subject/:subject_id', checkAuth,(req,res,next)=>{checkRole(req, res,next,["admin","student"])}, getTeachersBySubject)
router.get('/:id', checkAuth,(req,res,next)=> {checkRole(req, res,next,["admin","student"])},  getOneTeacher)
router.put('/:id', checkAuth,(req,res,next)=> {checkRole(req, res,next,["admin"])},  updateTeacher)
router.delete('/:id', checkAuth, (req,res,next)=> {checkRole(req, res,next,["admin"])},  deleteTeacher)


module.exports = router