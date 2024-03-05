const router = require('express').Router()

const { getAllTeachers, getOneTeacher, updateTeacher, deleteTeacher, addSubject, removeSubject

} = require('../controllers/teacher.controller')

router.get('/', getAllTeachers)
router.get('/:id', getOneTeacher)
//router.get('/:id', getOneLessonTypeBySubject)
router.put('/:id', updateTeacher)
router.delete('/:id', deleteTeacher)
router.post('/addSubjects/', addSubject)
router.post('/removeSubjects/', removeSubject)



module.exports = router