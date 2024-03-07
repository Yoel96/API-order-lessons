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

const updateTeacherProfile = async (req,res)=>{


    try {
        const teacher= await res.locals.user.getTeacher_info()

        const teacherUpdated = await teacher.update(req.body, {
            returning: true   })
        if (teacher !== 0) {
            return res.status(200).json({ message: 'Teacher updated', teacher: teacher })
        } else {
            return res.status(404).send('Teacher not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }



}


const getTeacherSubject = async ( req,res )=>{


    try {
        const teacher= await res.locals.user.getTeacher_info()
        const subjects = await teacher.getSubjects()

        if(!subjects) return res.status(400).send("This teacher doesnt have any subject")

        res.status(200).json(subjects)

       
    } catch (error) {
        return res.status(500).send(error.message)
    }


}


const teacherAddSubject = async (req, res) => {

    try {
        const teacher = await res.locals.user.getTeacher_info()
        const lessonType = await LessonType.create({name: req.body.lessonName})
        const subject = await Subject.findByPk(parseInt(req.body.subject_id))
        if (!subject) return res.status(400).send("Subject not found")

        await subject.addLesson_type(lessonType)
        await teacher.addLesson_type(lessonType)

         
        res.status(200).send("Teacher added to Subject and LessonType")
       
        

    } catch (error) {
        res.status(500).send(error.message)
    }



}


const teacherRemoveSubject = async (req, res) => {

    try {
        const teacher = await res.locals.user.getTeacher_info()
        
        const subject = await Subject.findByPk(parseInt(req.body.subject_id))
        if (!subject) return res.status(400).send("Subject not found")
        
        const deleted= await teacher.removeSubject(subject)
        if(deleted!=0) return res.status(200).send("Subject deleted")
        else return res.status(400).send("Teacher doesn't have that subject")


    } catch (error) {
        res.status(500).send(error.message)
    }

}

module.exports = { getAllTeachers, getOneTeacher, updateTeacher, deleteTeacher, teacherRemoveSubject, teacherAddSubject, updateTeacherProfile , getTeacherSubject }