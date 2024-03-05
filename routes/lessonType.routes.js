const router = require('express').Router()

const { getAllLessonTypes, getOneLessonType, createLessonType, updateLessonType, deleteLessonType
    
} = require('../api/controllers/lessonType.contoller')

router.get('/', getAllLessonTypes)
router.get('/:id', getOneLessonType)
router.post('/',  createLessonType)
router.put('/:id', updateLessonType)
router.delete('/:id', deleteLessonType)

module.exports = router