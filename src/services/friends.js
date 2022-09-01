const { ErrorObject } = require("../helpers/error")
const { decodeToken } = require("../middlewares/jwt")
const { Request } = require('../models/request')
const { Friend } = require('../models/friend')
const { User } = require("../models/user")

exports.sendRequest = async (token, body) => {
    try {
        const user = await decodeToken(token)
        body.userId = user.user.id
        const request = await Request.create(body)
        return request
    } catch (error) {
        throw new ErrorObject(error.message, error.statusCode || 500)
    }
}

exports.deleteRequest = async (id) => {
    try {
        const request = await this.findRequestById(id)
        await request.destroy()
    } catch (error) {
        throw new ErrorObject(error.message, error.statusCode || 500)
    }
}

exports.listPendingRequest = async (token) => {
    try {
        const user = await decodeToken(token)
        const pending = await Request.findAll({
            where: { toId: user.user.id }
        })
        if(!pending){
            throw new ErrorObject('There are no pending request yet', 404)
        }
        return pending
    } catch (error) {
        throw new ErrorObject(error.message, error.statusCode || 500)
    }
}

exports.listSendedRequest = async (token) => {
    try {
        const user = await decodeToken(token)
        const sended = await Request.findAll({
            where: { userId: user.user.id }
        })
        if(sended.lenght = 0){
            throw new ErrorObject('There are no sended request yet', 404)
        }
        return sended   
    } catch (error) {
        throw new ErrorObject(error.message, error.statusCode || 500)
    }
}

exports.findRequestById = async (id) => {
    try {
        const request = await Request.findByPk(id)
        if (!request){
            throw new ErrorObject('Request not found', 404)
        }
        return request
    } catch (error) {
        throw new ErrorObject(error.message, error.statusCode || 500)
    }
}

exports.acceptRequest = async (id, body) => {
    try {
        const request = await this.findRequestById(id)
        body.userId = request.toId 
        body.FriendId = request.userId
        const friend = await Friend.create(body)
        await this.deleteRequest(id)
        return friend
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
        const id  = user.user.id
        
        const friends = await Friend.findAll({
            where: { userId: id },
            attributes: ["FriendId"]

        })
        const names = await User.findAll({
            where: { id: id },
            attributes: ["firstName", "lastName"],
            include: 'user'
        })

        console.log(names)
        return names
    } catch (error) {
        throw new ErrorObject(error.message, error.statusCode || 500)
    }
}

exports.deleteFriend = async (id) => {
    try {
        const friend = await Friend.findByPk(id)
        if(!friend){
            throw new ErrorObject('Friend not found')
        }
        await friend.destroy()
    } catch (error) {
        throw new ErrorObject(error.message, error.statusCode || 500)
    }
}