const router = require('express').Router()
const {checkStudent} = require('../middlewares/auth.middleware')

const { getAllClassDates, getOneClassDate, createClassDate, updateClassDate, deleteClassDate, getClassDatesByUserEmail } = require('../controllers/classDate.controller')

router.get('/getUsers/:userEmail', getClassDatesByUserEmail)
router.get('/', getAllClassDates)
router.get('/:id', getOneClassDate)
router.post('/', checkStudent, createClassDate)
router.put('/:id', updateClassDate)
router.delete('/:id', deleteClassDate)
 //sirve para mostrar todas las valoraciones de un profesor o un estudiante buscandolo por el email


module.exports = router