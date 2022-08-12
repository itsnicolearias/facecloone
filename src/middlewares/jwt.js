const jwt = require('jsonwebtoken')
const { envConfig } = require('../config/envConfig')

const generateToken = (user) => new Promise((resolve, reject) => {
  jwt.sign({ user }, envConfig.jwt.secret, (err, token) => {
    if (err) {
      reject(err)
    } else {
      resolve(token)
    }
  })
})

const decodeToken = (token) => {
  try {
    const user = jwt.verify(token, envConfig.jwt.secret)
    return user
  } catch (error) {
    return error
  }
}

const verifyToken = (token) => {
  try {
    const { user } = decodeToken(token)
    if (!user) {
      return false
    }
    return true
  } catch (error) {
    return error
  }
}
module.exports = {
  generateToken,
  decodeToken,
  verifyToken,
}