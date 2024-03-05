const router = require('express').Router()

const {
    getAllTimetables, getOneTimetable, createTimetable, updateTimetable, deleteTimetable
} = require('../api/controllers/timetable.contoller')

router.get('/', getAllTimetables)
router.get('/:id', getOneTimetable)
router.post('/', createTimetable)
router.put('/:id', updateTimetable)
router.delete('/:id', deleteTimetable)

module.exports = router