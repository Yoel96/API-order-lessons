const router = require('express').Router()

const { getAllClassDates, getOneClassDate, createClassDate, updateClassDate, deleteClassDate, getClassDateByUserEmail } = require('../controllers/classDate.controller')

router.get('/getUsers/:userEmail', getClassDateByUserEmail)
//router.get('/', getAllClassDates)
//router.get('/:id', getOneClassDate)
router.post('/', createClassDate)
router.put('/:id', updateClassDate)
router.delete('/:id', deleteClassDate)
 //sirve para mostrar todas las valoraciones de un profesor o un estudiante buscandolo por el email


module.exports = router