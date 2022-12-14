const createHttpError = require('http-errors')
const { User } = require('../models/user')
const { ErrorObject } = require('../helpers/error')
const { decodeToken } = require('./jwt')

exports.verifyAdmin = async (req, res, next) => {
  try {
    const token = req.header('Authorization')
    const { user } = await decodeToken(token)
    const isAdmin = await User.findOne({
      where: {
        email: user.email,
        roleId: 1,
      },
    })
    if (isAdmin) {
      return next()
    }
    throw new ErrorObject('Unauthorized', 401)
  } catch (error) {
    const httpError = createHttpError(501, `[Error User Unauthorized] - [info - GET]: ${error}`)
    return next(httpError)
  }
}