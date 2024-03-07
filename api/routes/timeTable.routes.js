const router = require('express').Router()
const {checkRole, checkAuth} = require('../middlewares/auth.middleware')
const { getAllTimetables, getTimetableBysubject } = require('../controllers/timetable.contoller')

const {
    getAllTimetables, getTimetableBysubject, getTimeTableByTeacher
} = require('../controllers/timetable.contoller')

router.get('/', checkAuth,(req,res,next)=>{checkRole(req, res,next,["admin"])}, getAllTimetables)
router.get('/subject/:subject_id', checkAuth,(req,res,next)=>{checkRole(req, res,next,[ "admin", "student"])}, getTimetableBysubject )
router.get('/teacher/:teacher_id', checkAuth,(req,res,next)=>{checkRole(req, res,next,[ "admin", "student","teacher"])}, getTimeTableByTeacher )

module.exports = router