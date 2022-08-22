const { ErrorObject } = require('../helpers/error')
const { Comment } = require('../models/comment')
const { Post } = require('../models/post')
const { User } = require('../models/user')
const { decodeToken } = require('./jwt')

module.exports = (entity) => (async (req, res, next) => {
  const model = entity === 'User' ? User : Post
  const token = req.header('Authorization')

  const result = await model.findByPk(req.params.id)
  if (!result) throw new ErrorObject(`element of ${entity} with id ${req.params.id} not found`)

  const userId = entity === 'User' ? result.id : result.userId
  const user = decodeToken(token)

  if (user.user.roleId === 1 || user.user.id === userId) {
    next()
  } else {
    throw new ErrorObject('You are not allowed to do this', 403)
  }
})