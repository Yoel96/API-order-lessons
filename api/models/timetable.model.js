const { DataTypes } = require('sequelize')
const sequelize = require('..db/')


const Timetable = sequelize.define('timetable', {

    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    time: {
        type: DataTypes.TIME,
        allowNull: false
    },

})


module.exports = Timetable