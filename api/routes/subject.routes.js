const router = require('express').Router()
const {checkRole, checkAuth } = require('../middlewares/auth.middleware')
const { getAllSubjects, getOneSubject, createSubject, updateSubject, deleteSubject, getSubjectsByLessonType, addLessonType
} = require('../controllers/subject.controller')

router.get('/', checkAuth,(req,res,next)=>{  checkRole(res,res,next,["admin","student","teacher"])  }, getAllSubjects)
router.get('/:id', checkAuth,(req,res,next)=>{  checkRole(res,res,next,["admin","student","teacher"])  }, getOneSubject)
router.post('/',checkAuth,(req,res,next)=>{  checkRole(res,res,next,["admin"])  }, createSubject)
router.put('/:id', checkAuth,(req,res,next)=>{  checkRole(res,res,next,["admin"])  }, updateSubject)
router.delete('/:id', checkAuth,(req,res,next)=>{  checkRole(res,res,next,["admin"])  }, deleteSubject)
router.get('/:id', checkAuth,(req,res,next)=>{  checkRole(res,res,next,["admin","student","teacher"])  },  getSubjectsByLessonType)
router.post('/addLessonType', checkAuth,(req,res,next)=>{  checkRole(res,res,next,["admin"])  }, addLessonType)

module.exports = router