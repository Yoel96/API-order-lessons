const router = require('express').Router()
const { checkRole, checkAuth } = require('../middlewares/auth.middleware')

const { createClassDate, updateClassDate, deleteClassDate, getClassDatesByStudentEmail, getClassDatesByTeacher } = require('../controllers/classDate.controller')
const { getStudentTeachersFavourites, createFavouriteTeacherStudent, deleteFavouriteTeacherStudent } = require('../controllers/favouriteTeacherStudent.controller')
const { TeacherCreateTimetable, TeacherupdateTimetable, TeacherDeleteTimetable, TeacherTimetable } = require('../controllers/timetable.contoller')
const { getTeacherRatings, getUserRatings } = require('../controllers/teacherRatings.controller')
const { updateTeacherProfile, teacherAddSubject, teacherRemoveSubject, getTeacherSubject } = require('../controllers/teacher.controller')
const { updateProfile , deleteProfile} = require('../controllers/user.controller')

//change user info
router.put('/', checkAuth, (req, res, next) => { checkRole(req, res, next, ["student", "teacher"]) }, updateProfile)
router.delete('/', checkAuth, (req, res, next) => { checkRole(req, res, next, ["student", "teacher"]) }, deleteProfile)

/* Student routes */

// student Classdates
router.get('/classDate/student/', checkAuth, (req, res, next) => { checkRole(req, res, next, ["student"]) }, getClassDatesByStudentEmail)
router.post('/classDate/', checkAuth, (req, res, next) => { checkRole(req, res, next, ["student", "admin"]) }, createClassDate)
router.put('/classDate/:id', checkAuth, (req, res, next) => { checkRole(req, res, next, ["student", "admin"]) }, updateClassDate)
router.delete('/classDate/:id', checkAuth, (req, res, next) => { checkRole(req, res, next, ["student", "teacher", "admin"]) }, deleteClassDate)

// student favourite
router.get('/favouriteTeacher/', checkAuth, (req, res, next) => { checkRole(req, res, next, ["student"]) }, getStudentTeachersFavourites)
router.post('/favouriteTeacher/', checkAuth, (req, res, next) => { checkRole(req, res, next, ["student"]) }, createFavouriteTeacherStudent)
router.delete('/favouriteTeacher/:teacher_id', checkAuth, (req, res, next) => { checkRole(req, res, next, ["student"]) }, deleteFavouriteTeacherStudent)

// student ratings
router.get('/ratings/student/', checkAuth, (req, res, next) => { checkRole(req, res, next, ["student", "admin"]) }, getUserRatings)

/* Teacher routes */
//teacher info
router.put('/teacher/', checkAuth, (req, res, next) => { checkRole(req, res, next, ["teacher"]) }, updateTeacherProfile) 

// teacher classDates
router.get('/teacherClassDate/', checkAuth, (req, res, next) => { checkRole(req, res, next, ["teacher"]) }, getClassDatesByTeacher)

// teacher timetable
router.get('/timeTable/', checkAuth, (req, res, next) => { checkRole(req, res, next, ["teacher"]) }, TeacherTimetable)
router.post('/timeTable/', checkAuth, (req, res, next) => { checkRole(req, res, next, ["teacher"]) }, TeacherCreateTimetable)
router.put('/timeTable/:id', checkAuth, (req, res, next) => { checkRole(req, res, next, ["teacher"]) }, TeacherupdateTimetable)
router.delete('/timeTable/:id', checkAuth, (req, res, next) => { checkRole(req, res, next, ["teacher"]) }, TeacherDeleteTimetable)

// teacher ratings
router.get('/ratings/teacher/', checkAuth, (req, res, next) => { checkRole(req, res, next, ["student", "teacher", "admin"]) }, getTeacherRatings)

// teacher subjects
router.get('/subject/', checkAuth, (req, res, next) => { checkRole(req, res, next, ["teacher"]) }, getTeacherSubject)
router.post('/subject/', checkAuth, (req, res, next) => { checkRole(req, res, next, ["teacher"]) }, teacherAddSubject)
router.delete('/subject/:id', checkAuth, (req, res, next) => { checkRole(req, res, next, ["teacher"]) }, teacherRemoveSubject)





module.exports = router