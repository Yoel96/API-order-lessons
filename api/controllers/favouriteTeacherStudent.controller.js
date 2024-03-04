const Teacher = require('../models/teacher.model')
const User = require('../models/user.model')

async function getAllFavouriteTeachersStudent(req, res) {
    try {
        const student = await User.findByPk(req.params.student_id)
        const favouriteTeachers = await student.getTeacher()

        if (favouriteTeachers) {
            return res.status(200).json(favouriteTeachers)
        } else {
            return res.status(404).send('No favourite teachers found')
        }

    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function createFavouriteTeacherStudent(req, res) {
    try {
        const student = await User.findByPk(req.body.student_id)
        const teacher = await Teacher.findOne({
            where: {
                email: req.body.email
            }
        })

        const favouriteTeacher = await student.addTeacher_info(teacher) 
        
        return res.status(200).json('Favourite teacher created')
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function deleteFavouriteTeacherStudent(req, res) {
    try {
        const favourite = await TeacherStudentFavourite.destroy({
            where: {
                id: req.params.teacher_id,
            },
        })
        if (favourite) {
            return res.status(200).json('Favourite teacher deleted')
        } else {
            return res.status(404).send('Favourite teacher not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = {
    getAllFavouriteTeachersStudent,
    createFavouriteTeacherStudent,
    deleteFavouriteTeacherStudent
}
