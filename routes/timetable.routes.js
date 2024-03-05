const router = require('express').Router()

const {
    getAllTimetables, getOneTimetableByTeacher, createTimetable, updateTimetable, deleteTimetable, getTimetableBysubject
} = require('../api/controllers/timetable.contoller')

router.get('/', getAllTimetables)
router.get('/:id', getOneTimetableByTeacher)
router.post('/', createTimetable)
router.put('/:id', updateTimetable)
router.delete('/:id', deleteTimetable)
router.get('/:id', getTimetableBysubject )

module.exports = router