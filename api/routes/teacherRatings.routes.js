const router = require('express').Router()
const { getAllRatings, getOneRating, UsercreateRating, updateRating, deleteRating } = require('../controllers/teacherRatings.controller')
const {checkRole, checkAuth} = require('../middlewares/auth.middleware')


router.get('/', checkAuth,(req,res,next)=>{checkRole(req, res,next,["admin","student"])}, getAllRatings) 
router.get('/:id', checkAuth,(req,res,next)=>{checkRole(req, res,next,["admin","student"])}, getOneRating)
router.post('/', checkAuth,(req,res,next)=>{checkRole(req, res,next,["student"])},  UsercreateRating)
router.put('/:id', checkAuth,(req,res,next)=>{checkRole(req, res,next,["student", "admin"])},  updateRating)
router.delete('/:id', checkAuth,(req,res,next)=>{checkRole(req, res,next,["student", "admin"])}, deleteRating)
 //sirve para mostrar todas las valoraciones de un profesor o un estudiante buscandolo por el email

module.exports = router
