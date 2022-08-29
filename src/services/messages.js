const { Op } = require('sequelize')
const { ErrorObject } = require('../helpers/error')
const { decodeToken } = require('../middlewares/jwt')
const { Message } = require('../models/message')

exports.getMyMessages = async (token, content) => {
    try {
        const user = await decodeToken(token)
        return await Message.findAll({
            where: { 
              [Op.or]: [
                { userId: user.user.id },
                { receiverId: user.user.id}
              ]  
            }
        })
    } catch (error) {
        throw new ErrorObject(error.message, error.statusCode || 500)
    }
}

exports.getMessage = async (id) => {
    try {
         const message = await Message.findByPk(id)
         if (!message){
            throw new ErrorObject('Message not found', 404)
         }
         return message   
    } catch (error) {
        throw new ErrorObject(error.message, error.statusCode || 500)
    }
}

exports.createMessage = async (token, body) => {
    try {
        const user = await decodeToken(token)
        body.userId = user.user.id
        const message = await Message.create(body)
        return message
    } catch (error) {
        throw new ErrorObject(error.message, error.statusCode || 500) 
    }
}

exports.deleteMessage = async (id) => {
    try {
        const message = await this.getMessage(id)
        await message.destroy()
    } catch (error) {
        throw new ErrorObject(error.message, error.statusCode || 500)
    }
}