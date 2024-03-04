const { DataTypes } = require('sequelize')
const sequelize = require('../db/')


const Subject = sequelize.define('subject', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = Subject