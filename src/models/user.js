const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Role = require('./role');


const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        type: DataTypes.STRING
    },
    lastName: {
        type: DataTypes.STRING
    },
    age: {
        type: DataTypes.INTEGER
    },
    email: {
        type: DataTypes.STRING,
        unique: true
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
    state: {
        type: DataTypes.STRING
    },
    city: {
        type: DataTypes.STRING
    }
})


module.exports = { User }