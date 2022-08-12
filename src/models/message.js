const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./user');


const Message = sequelize.define('messages', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    body: {
        type: DataTypes.INTEGER
    },
    from: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    to: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    }
})

module.exports = Message