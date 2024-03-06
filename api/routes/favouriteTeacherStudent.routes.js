const router = require('express').Router()
const {checkRole ,checkAuth } = require('../middlewares/auth.middleware')
const { getStudentTeachersFavourites  } = require('../controllers/favouriteTeacherStudent.controller')

// router.get('/', checkAuth,(req,res,next)=>{  checkRole(res,res,next,["admin"])  } , getAllFavouriteTeachersStudent)


module.exports = router