const { ErrorObject } = require('../helpers/error')
const { decodeToken } = require('./jwt')

module.exports = (entity) => catchAsync(async (req, res, next) => {
  const result = await entity.findByPk(req.params.id)
  if (!result) throw new ErrorObject(`element of ${entity} with id ${req.params.id} not found`, 404)

  const userId = entity === 'User' ? result.id : result.userId
  const user = decodeToken(req)

  if (user.roleId === 1 || user.id === userId) {
    next()
  } else {
    throw new ErrorObject('You are not allowed to do this', 403)
  }
})
