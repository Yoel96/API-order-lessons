const sequelize = require('./index.js')
const User = require('../models/user.model.js')
const Teacher = require('../models/teacher.model.js')
const LessonType = require('../models/lessonType.model.js')
const Subject = require('../models/subject.model.js')
const TeacherRatings = require('../models/teacherRatings.model.js')
const Timetable = require('../models/timetable.model.js')
const ClassDate = require('../models/classDate.model.js')
const TeacherStudentFavourite = require('../models/favouriteTeacherStudent.model.js')
const SubjectLessonType = require('../models/subjectLessonType.model.js')
const TeacherSubject = require('../models/teacherSubject.model.js')
 
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
        
        await User.sync({alter:true})
        await Teacher.sync({alter:true})
        await LessonType.sync({alter:true})
        await Subject.sync({alter:true})
        await TeacherRatings.sync({alter:true})
        await Timetable.sync({alter:true})
        await ClassDate.sync({alter:true})
        await TeacherStudentFavourite.sync({alter:true})
        await SubjectLessonType.sync({alter:true})
        await TeacherSubject.sync({alter:true})
    } catch (err) {
        throw new Error(err)
    }
}

module.exports = { dbCheck, dbSync }