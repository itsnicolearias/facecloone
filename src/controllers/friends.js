const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')
const { sendRequest, deleteRequest, listPendingRequest, listSendedRequest } = require('../services/friends')

module.exports = {

    send: async (req, res, next) => {
        try {
            const token = req.header('Authorization')
            const { body } = req
            const response = await sendRequest(token, body)
            endpointResponse({
                res,
                message: 'Request sended successfully',
                body: response
            })
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
                `[Error retreiving info ] - [comment - GET]: ${error.message}`,
              )
              next(httpError)
        }
    },

    destroy: async (req, res, next) => {
        try {
            const { id } = req.params
            const response = await deleteRequest(id)
            endpointResponse({
                res,
                message: 'Request destroyed successfully',
                body: response
            })
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
                `[Error retreiving info ] - [comment - GET]: ${error.message}`,
              )
              next(httpError)
        }
    },

    listPending: async (req, res, next) => {
        try {
            const token = req.header('Authorization')
            const response = await listPendingRequest(token)
            endpointResponse({
                res,
                message: 'pending request listed  successfully',
                body: response
            })
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
                `[Error retreiving info ] - [comment - GET]: ${error.message}`,
              )
              next(httpError)
        }
    },

    listSended: async (req, res, next) => {
        try {
            const token = req.header('Authorization')
            const response = await listSendedRequest(token)
            endpointResponse({
                res,
                message: 'sended request listed  successfully',
                body: response
            })
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
                `[Error retreiving info ] - [comment - GET]: ${error.message}`,
              )
              next(httpError)
        }
    }
}