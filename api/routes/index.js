const router =require('express').Router()


router.use('/auth', require('./auth.routes.js'))
router.use('/user', require('./user.routes.js'))
router.use('/classDate', require('./classDate.routes'))
router.use('/teacherRatings', require('./teacherRatings.routes'))
router.use('/favouriteTeachers', require('./favouriteTeacherStudent.routes'))

module.exports = router
