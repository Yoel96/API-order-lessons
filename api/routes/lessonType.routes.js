const router = require('express').Router()

const { getAllLessonTypes, getOneLessonType, getOneLessonTypeBySubject, createLessonType, updateLessonType, deleteLessonType

} = require('../controllers/lessonType.contoller')

router.get('/', getAllLessonTypes)
router.get('/:id', getOneLessonType)
//router.get('/:id', getOneLessonTypeBySubject)
router.post('/', createLessonType)
router.put('/:id', updateLessonType)
router.delete('/:id', deleteLessonType)

module.exports = router