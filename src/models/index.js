const { User } = require('./user')
const { Post } = require('./post')
const { Comment } = require('./comment')
const { Message } = require('./message')
const { Request } = require('./request')
const { Friend } = require('./friend')
const { Role } = require('./role')
const { Like, typeLike } = require('./like')
require('./references')

const { sequelize } = require('../config/database')
const { ErrorObject } = require('../helpers/error')


const connectDB = async () => {
    try {
      await sequelize.sync({ alter: false })
    } catch (error) {
      throw new ErrorObject(error.message, error.statusCode || 500)
    }
}

const models = {
    User,
    Post,
    Comment,
    Message,
    Request,
    Friend,
    Role,
    Like
};


module.exports = {connectDB}, models
