const sequelize = require('./index.js')
const User = require('../models/user.model.js')
const Teacher = require('../models/teacher.model.js')
const LessonType = require('../models/lessonType.model.js')
const Subject = require('../models/subject.model.js')
const TeacherRatings = require('../models/teacherRatings.model.js')
const Timetable = require('../models/timetable.model.js')
const ClassDate = require('../models/classDate.model.js')
const TeacherStudentFavourite = require('../models/favouriteTeacherStudent.model.js')

const dbCheck = async () => {
    try {
        await sequelize.authenticate()
        console.log("Connected to Order Lessons database")
    }
    catch (err) {
        throw new Error(err)
    }
}

const dbSync = async () => {
    try {
        sequelize.sync({alter:true})
       
    } catch (err) {
        throw new Error(err)
    }
}

module.exports = { dbCheck, dbSync }