const router = require('express').Router()

const { getAllFavouriteTeachers, createFavouriteTeacher, deleteFavouriteTeacher } = require('../controllers/favouriteTeacherStudent.controller')

router.get('/:student_id', getAllFavouriteTeachers )
router.post('/', createFavouriteTeacher)
router.delete('/:teacher_id', deleteFavouriteTeacher)

module.exports = router