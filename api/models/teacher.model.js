const { DataTypes } = require('sequelize')
const sequelize = require('../db/index.js')


const Teacher = sequelize.define('teacher_info', {

    description: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    } 


})

module.exports= Teacher