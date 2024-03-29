const { DataTypes } = require('sequelize')
const sequelize = require('../db')

const ClassDate = sequelize.define('class_date', {
    comments: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [5, 500]
        }
    },
})

module.exports = ClassDate