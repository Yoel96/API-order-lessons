const router = require('express').Router()
const {checkRole, checkAuth } = require('../middlewares/auth.middleware')
const { getAllLessonTypes, getOneLessonType, getLessonTypesBySubject, getLessonTypesByTeacher,createLessonType, updateLessonType, deleteLessonType

} = require('../controllers/lessonType.contoller')

router.get('/', checkAuth,(req,res,next)=>{  checkRole(req, res,next,["admin" ])  } , getAllLessonTypes)
router.get('/:id', checkAuth,(req,res,next)=>{  checkRole(req, res,next,["admin"])  } , getOneLessonType)
router.get('/subject/:id', checkAuth,(req,res,next)=>{  checkRole(req, res,next,["admin"])  }, getLessonTypesBySubject)
router.get('/teacher/:id', checkAuth,(req,res,next)=>{  checkRole(req, res,next,["admin"])  }, getLessonTypesByTeacher)

router.post('/', checkAuth,(req,res,next)=>{  checkRole(req, res,next,["admin"])  } , createLessonType)
router.put('/:id',checkAuth,(req,res,next)=>{  checkRole(req, res,next,["admin"])  } , updateLessonType)
router.delete('/:id', checkAuth,(req,res,next)=>{  checkRole(req, res,next,["admin"])  } ,deleteLessonType)

module.exports = router