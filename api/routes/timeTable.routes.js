const router = require('express').Router()
const {checkTeacher} = require('../middlewares/auth.middleware')

const {
    getAllTimetables, createTimetable, updateTimetable, deleteTimetable, getTimetableBysubject
} = require('../controllers/timetable.contoller')

router.get('/', getAllTimetables)
//router.get('/:id', getOneTimetableByTeacher)
router.post('/', checkTeacher ,createTimetable)
router.put('/:id', checkTeacher , updateTimetable)
router.delete('/:id', checkTeacher , deleteTimetable)
router.get('/subject/:subject_id', getTimetableBysubject )

module.exports = router