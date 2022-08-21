const bcrypt = require('bcrypt')
const { ErrorObject } = require('../helpers/error')
const { generateToken } = require('../middlewares/jwt')
const { User } = require('../models/user')
const { getUserByEmail } = require('./users')


exports.Register = async (body) => {
    try {
        const existantUser = await getUserByEmail(body.email)
        if (existantUser) {
          throw new ErrorObject('Email already in use', 404)
        }
        const hashedPassword = await bcrypt.hash(body.password, 10)
        body.password = hashedPassword
        body.roleId = 2
        const newUser = await User.create(body)
        if (!newUser) {
          throw new ErrorObject('User registration failed', 404)
        }
        const token = await generateToken(newUser)
        return {
            newUser,
            token
        }
      } catch (error) {
        throw new ErrorObject(error.message, error.statusCode || 500)
      }
    }


exports.Login = async (email, password) => {
  try {
    const user = await User.findOne({ where: { email: email } })
    if (!user){
      throw new ErrorObject('User does not exists', 404)
    }
    const validPass = await bcrypt.compare(password, user.password)
    if (validPass) {
       const token = await generateToken(user)
        return token
    }
    throw new ErrorObject('Invalid credentials', 403)
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}