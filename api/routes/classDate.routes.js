const router = require('express').Router()

const { getAllClassDates, getOneClassDate, createClassDate, updateClassDate, deleteClassDate, getClassDateByUserEmail } = require('../controllers/classDate.controller')

router.get('/', getAllClassDates)
router.get('/:id', getOneClassDate)
router.post('/', createClassDate)
router.put('/:id', updateClassDate)
router.delete('/:id', deleteClassDate)
router.get('/user/:userEmail', getClassDateByUserEmail) //sirve para mostrar todas las valoraciones de un profesor o un estudiante buscandolo por el email


module.exports = router