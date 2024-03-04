const router = require('express').Router()

router.use('/classDate', require('./classDate.routes'))
router.use('/teacherRatings', require('./teacherRatings.routes'))
router.use('/favouriteTeachers', require('./teacherStudentFavourite.routes'))

module.exports = router