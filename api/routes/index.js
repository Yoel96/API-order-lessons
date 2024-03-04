const router = require('express').Router()

router.use('/classDate', require('./classDate.routes'))
router.use('/teacherRatings', require('./teacherRatings.routes'))
router.use('/favouriteTeachers', require('./favouriteTeacherStudent.routes'))

module.exports = router
