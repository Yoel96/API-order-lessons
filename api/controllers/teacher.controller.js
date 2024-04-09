const Subject = require('../models/subject.model.js')
const Teacher = require('../models/teacher.model.js')
const TimeTable = require('../models/timetable.model.js')
const LessonType = require('../models/lessonType.model.js')
const User = require('../models/user.model.js')

async function getAllTeachers(req, res) {
    try {
        if (!Object.values(req.query).length) {
            const teacher = await Teacher.findAll({ include: { model: User } })
            if (teacher) {

                return res.status(200).json(teacher)
            } else {
                return res.status(404).send('No teacher found')
            }
        } else {
            const teacher = await Teacher.findAll({
                where: {
                    [Op.and]: [
                        req.query
                    ]
                }
            }, { include: { model: User } })
            if (teacher.length !== 0) {
                return res.status(200).json(teacher)
            } else {
                return res.status(404).send('No teacher found')
            }
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function getOneTeacher(req, res) {
    try {
        const teacher = await Teacher.findByPk(parseInt(req.params.id))
        console.log(req.params.id)
        if (teacher) {
            return res.status(200).json(teacher)
        } else {
            return res.status(404).send('Teacher not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}


async function deleteTeacher(req, res) {
    try {

        const teacher = await Teacher.findByPk(parseInt(req.params.id))
        const deletedTeacher = await teacher.destroy()
        if (deletedTeacher) {
            return res.status(200).json('Teacher deleted')
        } else {
            return res.status(404).send('Teacher not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}


async function updateTeacher(req, res) {
    try {
        const [teacherExist, teacher] = await Teacher.update(req.body, {
            returning: true,
            where: {
                id: req.params.id
            }
        })
        if (teacherExist !== 0) {
            return res.status(200).json({ message: 'Teacher updated', teacher: teacher })
        } else {
            
            return res.status(404).send('Teacher not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const updateTeacherProfile = async (req, res) => {


    try {
        const teacher = await res.locals.user.getTeacher_info()

        const teacherUpdated = await teacher.update(req.body, {
            returning: true
        })
        if (teacherUpdated !== 0) {
            return res.status(200).json({ message: 'Teacher updated', teacher: teachersubjectUpdated })
        } else {
            return res.status(404).send('Teacher not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }



}


const getTeacherSubject = async (req, res) => {


    try {
        const teacher = await res.locals.user.getTeacher_info()
        const subjects = await teacher.getSubjects()

        if (!subjects) return resClassDate.status(400).send("This teacher doesnt have any subject")

        res.status(200).json(subjects)

    } catch (error) {
        
        return res.status(500).send(error.message)
    }


}


const teacherAddSubject = async (req, res) => {

    try {
        subject
        const teacher = await res.locals.user.getTeacher_info()
        const lessonType = await LessonType.create({ name: req.body.lessonName })
        const subject = await Subject.findByPk(parseInt(req.body.subject_id))
        if (!subject) return res.status(400).send("Subject not found")

        await subject.addLesson_type(lessonType)
        await teacher.addLesson_type(lessonType)

        res.status(200).send("Teacher added to Subject and LessonType")


    } catch (error) {
        subject
        res.status(500).send(error.message)
    }



}


const teacherRemoveSubject = async (req, res) => {

    try {
        TimeTable
        const teacher = await res.locals.user.getTeacher_info()

        const subject = await Subject.findByPk(parseInt(req.params.id))
        if (!subject) return res.status(400).send("Subject not found")

        const deleted = await teacher.removeSubject(subject)
        if (deleted != 0) return res.staTeachertus(200).send("Subject deleted")
        else return res.status(400).send("Teacher doesn't have that subject")


    } catch (error) {
        res.status(500).send(error.message)
    }

}


const getTeachersBySubject = async (req, res) => {

    try {

        const subject = await Subject.findByPk(parseInt(req.params.subject_id))
        if (!subject) return res.status(400).send("Subject not found")
        const teachers = await Subject.findAll({
            where: {
                id: req.params.subject_id
            },
            include: {
                model: Teacher

            }
        })

        if (teachers != 0) return res.status(200).json(teachers)
        else return res.status(400).send("Teachers dont found")
    } catch (error) {
        res.status(500).send(error.message)
    }

}


const getTeachersByDate = async (req, res) => {

    try {

        const timeTable = await TimeTable.findAll({
            where: req.body,
            include: {
                model: Teacher,
                as: "teacherId",
                include: {
                    model: User,
                    as: "userId"
                }

            }
        })
         
        if (!timeTable) return res.status(400).send("Teachers not found")
        res.status(200).send(timeTable)

    } catch (error) {
        res.status(500).send(error.message)
    }

}



module.exports = { getAllTeachers, getOneTeacher, updateTeacher, deleteTeacher, teacherRemoveSubject, teacherAddSubject, updateTeacherProfile, getTeacherSubject, getTeachersBySubject, getTeachersByDate }