const { DataTypes } = require('sequelize')
const sequelize = require('..db/')


const Timetable = sequelize.define('timetable', {

    date: {
        type: DataTypes.DATEONLY,
        allowNull: FALSE
    },
    time: {
        type: DataTypes.TIME,
        allowNull: FALSE
    },

})


module.exports = Timetable