const router = require('express').Router()
const {checkRole ,checkAuth } = require('../middlewares/auth.middleware')
const { getAllFavouriteTeachersStudent, createFavouriteTeacherStudent, deleteFavouriteTeacherStudent } = require('../controllers/favouriteTeacherStudent.controller')

router.get('/', checkAuth,(req,res,next)=>{  checkRole(res,res,next,["admin"])  } , getAllFavouriteTeachersStudent)
router.post('/', checkAuth,(req,res,next)=>{  checkRole(res,res,next,["student","admin"])  }, createFavouriteTeacherStudent)
router.delete('/:teacher_id', checkAuth,(req,res,next)=>{  checkRole(res,res,next,["student","admin"])  }, deleteFavouriteTeacherStudent)

module.exports = router