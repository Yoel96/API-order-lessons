const router = require('express').Router()

const { getAllSubjects, getOneSubject, createSubject, updateSubject, deleteSubject, getSubjectsByLessonType
} = require('../controllers/subject.controller')

router.get('/', getAllSubjects)
router.get('/:id', getOneSubject)
router.post('/', createSubject)
router.put('/:id', updateSubject)
router.delete('/:id', deleteSubject)
router.get('/:id', getOneSubject)
router.get('/:id', getSubjectsByLessonType)


module.exports = router