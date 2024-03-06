const router = require('express').Router()
const {checkRole, checkAuth } = require('../middlewares/auth.middleware')
const { getAllLessonTypes, getOneLessonType, getOneLessonTypeBySubject, createLessonType, updateLessonType, deleteLessonType

} = require('../controllers/lessonType.contoller')

router.get('/', checkAuth,(req,res,next)=>{  checkRole(req, res,next,["admin","student","teacher"])  } , getAllLessonTypes)
router.get('/:id', checkAuth,(req,res,next)=>{  checkRole(req, res,next,["admin","student","teacher"])  } , getOneLessonType)
//router.get('/:id', getOneLessonTypeBySubject)
router.post('/', checkAuth,(req,res,next)=>{  checkRole(req, res,next,["admin"])  } , createLessonType)
router.put('/:id',checkAuth,(req,res,next)=>{  checkRole(req, res,next,["admin"])  } , updateLessonType)
router.delete('/:id', checkAuth,(req,res,next)=>{  checkRole(req, res,next,["admin"])  } ,deleteLessonType)

module.exports = router