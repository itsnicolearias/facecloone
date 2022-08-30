const { ErrorObject } = require("../helpers/error")
const { decodeToken } = require("../middlewares/jwt")
const { Request } = require('../models/request')

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
        const request = await Request.findByPk(id)
        if(!request){
            throw new ErrorObject('Request not found', 404)
        }
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

exports.acceptRequest = async () => {
    try {
        
    } catch (error) {
        throw new ErrorObject(error.message, error.statusCode || 500)
    }
}

exports.declineRequest = async () => {
    try {
        
    } catch (error) {
        throw new ErrorObject(error.message, error.statusCode || 500)
    }
}