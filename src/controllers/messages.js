const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')
const { getMyMessages, getMessage, deleteMessage, createMessage } = require('../services/messages')

module.exports = {
    get: async (req, res, next) => {
        try {
            const token = req.header('Authorization')
            const response = await getMyMessages(token)
            endpointResponse({
                res,
                message: 'Messages obtained successfully',
                body: response
            })
        } catch (error) {
           const httpError = createHttpError(
                error.statusCode,
                `[Error retreiving info ] - [messages - GET]: ${error.message}`,
              )
              next(httpError)
        }
    },

    getById: async (req, res, next) => {
        try {
            const { id } = req.params
            const response = await getMessage(id)
            endpointResponse({
                res,
                message: 'Message obtained successfully',
                body: response
            })
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
                `[Error retreiving info ] - [messages - GET BY ID]: ${error.message}`,
              )
              next(httpError)
        }
    },

    create: async (req, res, next) => {
        try {
            const token = req.header('Authorization')
            const { body } = req
            const response = await createMessage(token, body)
            endpointResponse({
                res,
                message: 'Message created successfully',
                body: response
            })
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
                `[Error retreiving info ] - [messages - POST]: ${error.message}`,
              )
              next(httpError)
        }
    },

    destroy: async (req, res, next) => {
        try {
            const { id } = req.params
            const response = await deleteMessage(id)
            endpointResponse({
                res,
                message: 'Message deleted successfully',
                body: response
            })
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
                `[Error retreiving info ] - [messages - DELETE]: ${error.message}`,
              )
              next(httpError)
        }
    }
}