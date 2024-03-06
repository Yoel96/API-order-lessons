const router = require('express').Router()
const {checkRole ,checkAuth } = require('../middlewares/auth.middleware')

const { getAllClassDates, getOneClassDate, createClassDate, updateClassDate, deleteClassDate, getClassDatesByStudentEmail } = require('../controllers/classDate.controller')

router.get('/student/', checkAuth,(req,res,next)=>{  checkRole(res,res,next,["student"])  } , getClassDatesByStudentEmail)

router.get('/', checkAuth,(req,res,next)=>{  checkRole(res,res,next,["admin"])  }, getAllClassDates)
router.get('/:id', checkAuth,(req,res,next)=>{  checkRole(res,res,next,["admin"])  }, getOneClassDate)
router.post('/',  checkAuth,(req,res,next)=>{  checkRole(res,res,next,["student","admin"])  } , createClassDate)
router.put('/:id', checkAuth,(req,res,next)=>{  checkRole(res,res,next,["student","admin"])  } ,updateClassDate)
router.delete('/:id', checkAuth,(req,res,next)=>{  checkRole(res,res,next, ["student","teacher", "admin"])  }, deleteClassDate)
 //sirve para mostrar todas las valoraciones de un profesor o un estudiante buscandolo por el email


module.exports = router