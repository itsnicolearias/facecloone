const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const { User } = require('./user');

const Post = sequelize.define('posts', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    content: {
        type: DataTypes.TEXT
    },
    images: {
        type: DataTypes.STRING
    }
})

module.exports = { Post };