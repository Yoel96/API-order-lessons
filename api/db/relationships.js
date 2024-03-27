
const sequelize = require('./index.js')
const User = require('../models/user.model.js')
const Teacher = require('../models/teacher.model.js')
const LessonType = require('../models/lessonType.model.js')
const Subject = require('../models/subject.model.js')
const TeacherRatings = require('../models/teacherRatings.model.js')
const Timetable = require('../models/timetable.model.js')
const TeacherStudentFavourite = require('../models/favouriteTeacherStudent.model.js')
const ClassDate = require('../models/classDate.model.js')
 
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

         
         
        Teacher.belongsToMany(Subject, { through: LessonType , unique: false });
        Subject.belongsToMany(Teacher, { through: LessonType , unique: false });
        Teacher.hasMany(LessonType);
        LessonType.belongsTo(Teacher);
        Subject.hasMany(LessonType);
        LessonType.belongsTo(Subject);
   

    } catch (err) {
        throw new Error(err.message)
    }
}

module.exports= DBRelationships
