const router =require('express').Router()
const {checkRole ,checkAuth } = require('../middlewares/auth.middleware')

const {  createClassDate, updateClassDate, deleteClassDate, getClassDatesByStudentEmail } = require('../controllers/classDate.controller')
const {  getStudentTeachersFavourites, createFavouriteTeacherStudent, deleteFavouriteTeacherStudent } = require('../controllers/favouriteTeacherStudent.controller')
const {  TeachercreateTimetable, TeacherupdateTimetable, TeacherDeleteTimetable} = require('../controllers/timetable.contoller')
const { getTeacherRatings, getUserRatings } = require('../controllers/teacherRatings.controller')


// Student routes

// student Classdates
router.get('/classDate/student/', checkAuth,(req,res,next)=>{  checkRole(req, res,next,["student"])} , getClassDatesByStudentEmail)
router.post('/classDate/',  checkAuth,(req,res,next)=>{  checkRole(req, res,next,["student","admin"])} , createClassDate)
router.put('/classDate/:id', checkAuth,(req,res,next)=>{  checkRole(req, res,next,["student","admin"])} , updateClassDate)
router.delete('/classDate/:id', checkAuth,(req,res,next)=>{  checkRole(req, res,next, ["student","teacher", "admin"])}, deleteClassDate)


// student favourite
router.get('/favouriteTeacher/', checkAuth, (req,res,next)=>{ checkRole(req, res,next,["student"])} , getStudentTeachersFavourites)
router.post('/favouriteTeacher/', checkAuth, (req,res,next)=>{ checkRole(req, res,next,["student"])}, createFavouriteTeacherStudent)
router.delete('/favouriteTeacher/:teacher_id', checkAuth,(req,res,next)=>{  checkRole(req, res,next,["student"])}, deleteFavouriteTeacherStudent)


// student ratings
router.get('ratings/student/', checkAuth, (req,res,next)=>{checkRole(req, res, next,["student", "admin"])}, getUserRatings )




// Teacher routes

// teacher timetable
router.post('timeTable/', checkAuth,(req,res,next)=>{checkRole(req, res,next,["teacher"])},TeachercreateTimetable)
router.put('timeTable/:id', checkAuth,(req,res,next)=>{checkRole(req, res,next,["teacher"])}, TeacherupdateTimetable)
router.delete('timeTable/:id', checkAuth,(req,res,next)=>{checkRole(req, res,next,["teacher"])}, TeacherDeleteTimetable)

// teacher ratings
router.get('ratings/teacher/', checkAuth,(req,res,next)=>{checkRole(req, res,next,["student", "teacher", "admin"])}, getTeacherRatings)





module.exports= router