const { DataTypes } = require('sequelize')
const sequelize = require('../db')

const ClassDate = sequelize.define('classDate', {
    comments: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [5, 500]
        }
    },
})

module.exports = ClassDate