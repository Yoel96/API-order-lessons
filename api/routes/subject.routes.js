const router = require('express').Router()
const {checkRole, checkAuth } = require('../middlewares/auth.middleware')
const { getAllSubjects, getOneSubject, createSubject, updateSubject, deleteSubject, getSubjectsByLessonTypeName,getSubjectsByTeacher,getAvailableSubject
} = require('../controllers/subject.controller')

router.get('/', checkAuth,(req,res,next)=>{  checkRole(req, res,next,["admin","student","teacher"])  }, getAllSubjects)
router.get('/available/', checkAuth,(req,res,next)=>{  checkRole(req, res,next,["admin","student"])  }, getAvailableSubject)

router.get('/:id', checkAuth,(req,res,next)=>{  checkRole(req, res,next,["admin","student","teacher"])  }, getOneSubject)
router.post('/',checkAuth,(req,res,next)=>{  checkRole(req, res,next,["admin"])  }, createSubject)
router.put('/:id', checkAuth,(req,res,next)=>{  checkRole(req, res,next,["admin"])  }, updateSubject)
router.delete('/:id', checkAuth,(req,res,next)=>{  checkRole(req, res,next,["admin"])  }, deleteSubject)
router.get('/lessonType/:name', checkAuth,(req,res,next)=>{  checkRole(req, res,next,["admin","student","teacher"])  },  getSubjectsByLessonTypeName)
router.get('/teacher/:id', checkAuth, (req,res,next)=>{  checkRole(req, res,next,["admin","student","teacher"])  },  getSubjectsByTeacher)

module.exports = router