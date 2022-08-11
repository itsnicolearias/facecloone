const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Role = require('./role');


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
    roleId: {
        type: DataTypes.INTEGER,
        references: {
            model: Role,
            key: 'id'
          }
    }
})


module.exports = User