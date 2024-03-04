const { DataTypes } = require('sequelize')
const sequelize = require('../db')

const TeacherRatings = sequelize.define('teacherRating', {
    rating: {
        type: DataTypes.DECIMAL,
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