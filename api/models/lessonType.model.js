const { DataTypes } = require('sequelize')
const sequelize = require('../db/')


const LessonType = sequelize.define('lesson_type', {
   id:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      unique:true,
      autoIncrement: true,
     

   },
   
   name:  {
    type: DataTypes.STRING,
    allowNull: false
   }
})


module.exports = LessonType