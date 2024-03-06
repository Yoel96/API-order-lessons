const router = require('express').Router()
const {checkRole ,checkAuth } = require('../middlewares/auth.middleware')

const { getAllClassDates, getOneClassDate} = require('../controllers/classDate.controller')


router.get('/', checkAuth,(req,res,next)=>{  checkRole(req, res,next,["admin"])  }, getAllClassDates)
router.get('/:id', checkAuth,(req,res,next)=>{  checkRole(req, res,next,["admin"])  }, getOneClassDate)
 
 //sirve para mostrar todas las valoraciones de un profesor o un estudiante buscandolo por el email


module.exports = router