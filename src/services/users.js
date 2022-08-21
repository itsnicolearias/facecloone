const bcrypt = require('bcrypt')
const { ErrorObject } = require('../helpers/error')
const { User } = require('../models/user')

exports.getAllUsers = async () => {
  const users = await User.findAll()
  return users
}

exports.createUser = async (User) => {
  try {
    const user = await User.create(user)
  return user
  } catch (error) {
    console.log(error)
  }
  
}

exports.getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ where: { email } })
    if (!user){
        throw new ErrorObject('User not found', 404)
    }
    return user
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}

exports.getUserById = async (id) => {
  try {
    const user = await User.findOne({ where: { id } })
    if (!user){
        throw new ErrorObject('User not found', 404)
    }
    return user
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}

exports.getPassword = (myPlaintextPassword, hash) => {
  try {
    return bcrypt.compareSync(myPlaintextPassword, hash)
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}


exports.deleteUser = async (id) => {
  try {
    const user = await User.findByPk(id)
    if (user) {
      User.destroy({ where: { id: user.id } })
    } else {
      throw new ErrorObject('User not found', 404)
    }
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}

exports.updateUserById = async (id, body) => {
  try {
    const user = await User.findByPk(id)
    if (!user) {
      throw new ErrorObject('User not found', 404)
    }
    const hashedPassword = await bcrypt.hash(body.password, 10)
    body.password = hashedPassword
    await user.update(body)
    return user
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}