const router =require('express').Router()


router.use('/auth', require('./auth.routes.js'))
router.use('/user', require('./user.routes.js'))
router.use('/classDate', require('./classDate.routes'))
router.use('/teacherRatings', require('./teacherRatings.routes'))
router.use('/favouriteTeachers', require('./favouriteTeacherStudent.routes'))
router.use('/timeTable', require('./timeTable.routes'))
router.use('/lessonType', require('./lessonType.routes'))
router.use('/subject', require('./subject.routes'))

module.exports = router
