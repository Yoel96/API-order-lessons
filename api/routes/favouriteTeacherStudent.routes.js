const router = require('express').Router()

const { getAllFavouriteTeachersStudent, createFavouriteTeacherStudent, deleteFavouriteTeacherStudent } = require('../controllers/favouriteTeacherStudent.controller')

router.get('/', getAllFavouriteTeachersStudent)
router.post('/', createFavouriteTeacherStudent)
router.delete('/:teacher_id', deleteFavouriteTeacherStudent)

module.exports = router