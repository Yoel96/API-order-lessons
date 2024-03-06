const { DataTypes } = require('sequelize')
const sequelize = require('../db')

const TeacherRatings = sequelize.define('teacher_rating', {
    rating: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
        validate: {
        min: 0,
        max: 5
        }
    },
    review: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            len: [5, 500]
        }
    },
})

module.exports = TeacherRatings