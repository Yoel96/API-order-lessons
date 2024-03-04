const router = require('express').Router()

const { getAllRatings, getOneRating, createRating, updateRating, deleteRating, getTeacherRatingByEmail } = require('../controllers/teacherRatings.controller')

router.get('/', getAllRatings) 
router.get('/:id', getOneRating)
router.post('/', createRating)
router.put('/:id', updateRating)
router.delete('/:id', deleteRating)
router.get('/user/:userEmail', getTeacherRatingByEmail) //sirve para mostrar todas las valoraciones de un profesor o un estudiante buscandolo por el email


module.exports = router