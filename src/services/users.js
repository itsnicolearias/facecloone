const bcrypt = require('bcrypt')
const { ErrorObject } = require('../helpers/error')
const { User } = require('../models/user')
const { Post } = require('../models/Post')
const { uploadImage, deleteImage } = require('./imageService')

exports.getAllUsers = async () => {
  const users = await User.findAll()
  return users
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
    if(!user){
      throw new ErrorObject('User not found', 404)
    }
    if(user.profilePic){
      await deleteImage(user.profilePic)
    }
    await user.destroy()
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}

exports.updateUserById = async (id, body, files) => {
  try {
    const user = await User.findByPk(id)
    if (!user) {
      throw new ErrorObject('User not found', 404)
    }
    if (body.password){
      const hashedPassword = await bcrypt.hash(body.password, 10)
      body.password = hashedPassword
    }
    if (files){
      body.profilePic = await uploadImage(files.image)
    }
    await user.update(body)
    return user
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}

exports.getUsersPost = async (id) => {
  try {
    const posts = await Post.findAll({ where: { userId: id }})
    return posts
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}