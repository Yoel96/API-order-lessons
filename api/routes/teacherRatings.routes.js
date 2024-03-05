const router = require('express').Router()

const { getAllRatings, getOneRating, createRating, updateRating, deleteRating, getTeacherRatingByEmail } = require('../controllers/teacherRatings.controller')
const {checkStudent} = require('../middlewares/auth.middleware')


router.get('/', getAllRatings) 
router.get('/:id', getOneRating)
router.post('/', checkStudent, createRating)
router.put('/:id', checkStudent,  updateRating)
router.delete('/:id', checkStudent, deleteRating)
router.get('/user/:userEmail', getTeacherRatingByEmail) //sirve para mostrar todas las valoraciones de un profesor o un estudiante buscandolo por el email

module.exports = router
