const router = require('express').Router()
const {checkRole, checkAuth} = require('../middlewares/auth.middleware')
const { getAllTeachers, getOneTeacher, updateTeacher, deleteTeacher, addSubject, removeSubject } = require('../controllers/teacher.controller')

router.get('/', checkAuth,(req,res,next)=>{checkRole(req, res,next,["admin","student"])}, getAllTeachers)
router.get('/:id', (req,res,next)=> {checkRole(req, res,next,["admin","student"])},  getOneTeacher)
//router.get('/:id', getOneLessonTypeBySubject)
router.put('/:id', (req,res,next)=> {checkRole(req, res,next,["admin","teacher"])},  updateTeacher)
router.delete('/:id', (req,res,next)=> {checkRole(req, res,next,["admin"])},  deleteTeacher)
router.post('/addSubjects/', (req,res,next)=> {checkRole(req, res,next,["admin"])}, addSubject)
router.post('/removeSubjects/', (req,res,next)=> {checkRole(req, res,next,["admin"])}, removeSubject)



module.exports = router