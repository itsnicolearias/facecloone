const { ErrorObject } = require("../helpers/error")
const { decodeToken } = require("../middlewares/jwt")
const { Request } = require('../models/request')
const { Friend } = require('../models/friend')
const { User } = require("../models/user")
const { Op } = require("sequelize")

exports.sendRequest = async (token, id) => {
    try {
        const user = await decodeToken(token)
        
        const request = await Friend.create({
        userId: user.user.id,
        friendId: id,
        statusId: 1
        })
        return request
    } catch (error) {
        throw new ErrorObject(error.message, error.statusCode || 500)
    }
}

exports.deleteRequest = async (id) => {
    try {
        const request = await this.findFriendshipById(id)
        await request.destroy()
    } catch (error) {
        throw new ErrorObject(error.message, error.statusCode || 500)
    }
}

exports.listPendingRequest = async (token) => {
    try {
        const user = await decodeToken(token)
        const pending = await Friend.findAll({
            where: {
              [Op.and]: [
                { friendId: user.user.id },
                { statusId: 1 }
              ]
            }
        })
        return pending
    } catch (error) {
        throw new ErrorObject(error.message, error.statusCode || 500)
    }
}

exports.listSendedRequest = async (token) => {
    try {
        const user = await decodeToken(token)
        const sended = await Friend.findAll({
            where: {
              [Op.and]: [
                { userId: user.user.id },
                { statusId: 1 }
              ]
            }
        })
        
        return sended   
    } catch (error) {
        throw new ErrorObject(error.message, error.statusCode || 500)
    }
}

exports.findFriendshipById = async (id) => {
    try {
        const friendship = await Friend.findByPk(id)
        if (!friendship){
            throw new ErrorObject('Friendship not found', 404)
        }
        return friendship
    } catch (error) {
        throw new ErrorObject(error.message, error.statusCode || 500)
    }
}

exports.acceptRequest = async (id, body) => {
    try {
        const friendship = await this.findFriendshipById(id)
        body.statusId = 3
        return await friendship.update(body)
    } catch (error) {
        throw new ErrorObject(error.message, error.statusCode || 500)
    }
}

exports.declineRequest = async (id) => {
    try {
        await this.deleteRequest(id)
    } catch (error) {
        throw new ErrorObject(error.message, error.statusCode || 500)
    }
}

exports.listFriends = async (token) => {
    try {
        const user = await decodeToken(token)
        const friends = await Friend.findAll({
            where: {
                [Op.or]: [
                    { userId: user.user.id},
                    { friendId: user.user.id}
                ]
            }
        })
        return friends
    } catch (error) {
        throw new ErrorObject(error.message, error.statusCode || 500)
    }
}

exports.deleteFriend = async (id) => {
    try {
        const friend = await this.findFriendshipById(id)
        await friend.destroy()
    } catch (error) {
        throw new ErrorObject(error.message, error.statusCode || 500)
    }
}