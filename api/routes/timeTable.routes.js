const router = require('express').Router()
const {checkRole, checkAuth} = require('../middlewares/auth.middleware')

const {
    getAllTimetables, createTimetable, updateTimetable, deleteTimetable, getTimetableBysubject
} = require('../controllers/timetable.contoller')

router.get('/', checkAuth,(req,res,next)=>{checkRole(res,res,next,["admin"])}, getAllTimetables)
//router.get('/:id', getOneTimetableByTeacher)
router.post('/', checkAuth,(req,res,next)=>{checkRole(res,res,next,["teacher"])},createTimetable)
router.put('/:id', checkAuth,(req,res,next)=>{checkRole(res,res,next,["teacher"])}, updateTimetable)
router.delete('/:id', checkAuth,(req,res,next)=>{checkRole(res,res,next,["teacher"])}, deleteTimetable)
router.get('/subject/:subject_id', checkAuth,(req,res,next)=>{checkRole(res,res,next,[ "admin", "student"])}, getTimetableBysubject )

module.exports = router