
const sequelize = require('./index.js')
const User = require('../models/user.model.js')
const Teacher = require('../models/teacher.model.js')
const LessonType = require('../models/lessonType.model.js')
const Subject = require('../models/subject.model.js')
const TeacherRatings = require('../models/teacherRatings.model.js')
const Timetable = require('../models/timetable.model.js')
const TeacherStudentFavourite = require('../models/teacherStudentFavourite.model.js')
const ClassDate = require('../models/classDate.model.js')
const SubjectLessonType = require('../models/subjectLessonType.model.js')
const TeacherSubject = require('../models/teacherSubject.model.js')




const DBRelationships = async() =>{


    try {

        User.hasOne(Teacher ,{ foreignKey:"user_Id"})
        Teacher.belongsTo(User ,{as:"userId" ,foreignKey:"user_Id"} )

        User.hasMany(TeacherRatings, { foreignKey:"student_id"})
        TeacherRatings.belongsTo(User , {as:"userId",foreignKey:"student_id"})

        Teacher.hasMany(TeacherRatings, { foreignKey:"teacher_id"})
        TeacherRatings.belongsTo(Teacher , {as:"teacherId",foreignKey:"teacher_id"})

        Teacher.belongsToMany( User,  { through: TeacherStudentFavourite , foreignKey:"teacher_id"})
        User.belongsToMany( Teacher, { through: TeacherStudentFavourite, foreignKey:"student_id" })

        Teacher.hasMany(Timetable, { foreignKey:"teacher_id"})
        Timetable.belongsTo(Teacher , {as:"teacherId",foreignKey:"teacher_id"})

        Timetable.hasOne(ClassDate ,{ foreignKey:"timeTable_Id"})
        ClassDate.belongsTo(Timetable ,{as:"timetableId" ,foreignKey:"timeTable_Id"} )

        User.hasMany(ClassDate, { foreignKey:"student_id"})
        ClassDate.belongsTo(User , {as:"userId",foreignKey:"student_id"})

        LessonType.belongsToMany( Subject,  { through: SubjectLessonType , foreignKey:"lesson_type_id"})
        Subject.belongsToMany( LessonType, { through: SubjectLessonType , foreignKey:"subject_id"})
       
        Teacher.belongsToMany( Subject,  { through: TeacherSubject , foreignKey:"teacher_id"})
        Subject.belongsToMany( Teacher, { through: TeacherSubject , foreignKey:"subject_id"})


    } catch (err) {
        throw new Error(err)
    }

}

module.exports= DBRelationships
