const { sequelize } = require('../config/database')
const { DataTypes } = require('sequelize')
const { Post } = require('./post')
const { User } = require('./user')

const Comment = sequelize.define('comments', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    body: {
        type: DataTypes.TEXT
    },
    image: {
        type: DataTypes.STRING
    }
})

module.exports = {Comment}