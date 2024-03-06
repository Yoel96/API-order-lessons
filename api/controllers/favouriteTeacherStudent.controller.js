const Teacher = require('../models/teacher.model')
const User = require('../models/user.model')

async function getStudentTeachersFavourites(req, res) {
    try {
        const student = res.locals.user
        if (!student) return res.status(404).send('No student found')

        const favouriteTeachers = await student.getTeacher_infos()

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
        const student = res.locals.user
        const teacher = await Teacher.findByPk(parseInt(req.body.teacher_id))

        const favouriteTeacher = await student.addTeacher_info(teacher)

        return res.status(200).json('Favourite teacher created')
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function deleteFavouriteTeacherStudent(req, res) {
    try {
        const student = res.locals.user
        const teacher = await Teacher.findByPk(parseInt(req.params.teacher_id))

        await student.removeTeacher_infos(teacher)

        return res.status(200).json('Favourite teacher deleted')

    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = {
    getStudentTeachersFavourites,
    createFavouriteTeacherStudent,
    deleteFavouriteTeacherStudent
}
