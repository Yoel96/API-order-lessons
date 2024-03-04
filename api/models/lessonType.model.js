const { DataTypes } = require('sequelize')
const sequelize = require('../db/')


const LessonType = sequelize.define('lesson_type', {
   name:  {
    type: DataTypes.STRING,
    allowNull: false
   }
})


module.exports = LessonType