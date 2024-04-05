const { DataTypes } = require('sequelize')
const sequelize = require('../db/')


const Subject = sequelize.define('subject', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    subjectImage: {
        type: DataTypes.STRING,
        allowNull: true,
    },
})

module.exports = Subject