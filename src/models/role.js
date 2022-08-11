const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./user');


const Role = sequelize.define('roles', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    }
})


module.exports = Role