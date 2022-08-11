const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database')


const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    age: {
        type: DataTypes.INTEGER
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    profilePic: {
        type: DataTypes.STRING
    },
    phone: {
        type: DataTypes.INTEGER
    },
    aboutMe: {
        type: DataTypes.TEXT
    },
    role: {
        type: DataTypes.INTEGER
    }
})

module.exports = User