const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./user');


const Post = sequelize.define('posts', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
          }
    },
    content: {
        type: DataTypes.TEXT
    },
    images: {
        type: DataTypes.STRING
    },
    likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    dislikes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    comments: {
        type: DataTypes.ARRAY
    }
})

module.exports = Post;