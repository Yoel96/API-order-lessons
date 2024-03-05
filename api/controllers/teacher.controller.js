const Subject = require('../models/subject.model.js')
const Teacher = require('../models/teacher.model.js')
const LessonType = require('../models/lessonType.model.js')

async function getAllTeachers(req, res) {
    try {
        if (!Object.values(req.query).length) {
            const teacher = await Teacher.findAll()
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
            })
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
        const teacher = await Teacher.findByPk(req.params.id)

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
        const teacher = await teacher.destroy({
            where: {
                id: req.params.id
            }
        })
        if (teacher) {
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


const addSubject = async (req, res) => {

    try {
        const teacher = await Teacher.findByPk(req.body.teacher_id)
        if (!teacher) return res.status(400).send("Teacher not found")

        const subject = await Subject.findByPk(req.body.subject_id)
        const lessonType = await LessonType.findByPk(req.body.lessonType_id)

        const hasLessonTYpe = await subject.hasLesson_type(lessonType)
        if (hasLessonTYpe) {
            await teacher.addSubject(subject)
            res.status(200).send("Subject added to Teacher")
        }

    } catch (error) {
        res.status(500).send(error.message)
    }



}


const removeSubject = async (req, res) => {



}

module.exports = { getAllTeachers, getOneTeacher, updateTeacher, deleteTeacher, removeSubject, addSubject }