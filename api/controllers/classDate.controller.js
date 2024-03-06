const ClassDate = require('../models/classDate.model')
const User = require('../models/user.model')
const Timetable = require('../models/timetable.model')

async function getAllClassDates(req, res) {
    try {
        const classDates = await ClassDate.findAll()
        if (classDates) {
            return res.status(200).json(classDates)
        } else {
            return res.status(404).send('No classDates found')
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function getOneClassDate(req, res) {
    try {
        const classDate = await ClassDate.findByPk(req.params.id)
        if (classDate) {
            return res.status(200).json(classDate)
        } else {
            return res.status(404).send('ClassDate not found')
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function createClassDate(req, res) {
    try {

        const timetable = await Timetable.findByPk(parseInt(req.body.timeTable_Id))
        if (timetable) {
            const studentClass = await timetable.getClass_date()
             if (!studentClass) {
                const classDate = await ClassDate.create({
                    comments: req.body.comments
                })
                await res.locals.user.addClass_date(classDate)
                await timetable.setClass_date(classDate)
                return res.status(200).json('ClassDate created')
            }
            return res.status(400).send("That hour is already taken or doesnt exist in the system")
        }
        res.status(400).send("That hour does not exist")


    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function updateClassDate(req, res) {
    try {
        
        const [classDateExist, classDate] = await ClassDate.update(req.body, {
            returning: true,
            where: {
                id: req.params.id,
            },
        })
        if (classDateExist !== 0) {
            return res.status(200).json('ClassDate updated')
        } else {
            return res.status(404).send('ClassDate not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function deleteClassDate(req, res) {
    try {
        const classDate = await ClassDate.destroy({
            where: {
                id: req.params.id,
            },
        })
        if (classDate) {
            return res.status(200).json('ClassDate deleted')
        } else {
            return res.status(404).send('ClassDate not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function getClassDatesByStudentEmail(req, res) {
    try {

        const student = res.locals.user
        if (student) {
            const classDates = await student.getClass_dates()

            if (classDates.length > 0) {
                return res.status(200).json(classDates)
            } else {
                return res.status(400).send('classDate not found')
            }
        }
        return res.status(400).send('User not found')
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = {
    getAllClassDates,
    getOneClassDate,
    createClassDate,
    updateClassDate,
    deleteClassDate,
    getClassDatesByStudentEmail
}
