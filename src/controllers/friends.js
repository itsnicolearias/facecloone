const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')
const { sendRequest, deleteRequest, listPendingRequest, listSendedRequest, acceptRequest, declineRequest, listFriends, deleteFriend } = require('../services/friends')

module.exports = {

    send: async (req, res, next) => {
        try {
            const token = req.header('Authorization')
            const { id } = req.params
            const response = await sendRequest(token, id)
            endpointResponse({
                res,
                message: 'Request sended successfully',
                body: response
            })
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
                `[Error retreiving info ] - [request - GET]: ${error.message}`,
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
                `[Error retreiving info ] - [request - GET]: ${error.message}`,
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
                `[Error retreiving info ] - [request - GET]: ${error.message}`,
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
                `[Error retreiving info ] - [request - GET]: ${error.message}`,
              )
              next(httpError)
        }
    },

    accept: async (req, res, next) => {
        try {
            const { id } = req.params
            const { body } = req
            const response = await acceptRequest(id, body)
            endpointResponse({
                res,
                message: 'request accepted successfully',
                body: response
            })
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
                `[Error retreiving info ] - [request - GET]: ${error.message}`,
              )
              next(httpError)
        }
    },

    decline: async (req, res, next) => {
        try {
            const { id } = req.params
            const response = await declineRequest(id)
            endpointResponse({
                res,
                message: 'request declined successfully',
                body: response
            })
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
                `[Error retreiving info ] - [request - GET]: ${error.message}`,
              )
              next(httpError)
        }
    },

    list: async (req, res, next) => {
        try {
            const token = req.header('Authorization')
            const response = await listFriends(token)
            endpointResponse({
                res,
                message: 'friends listed successfully',
                body: response
            })
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
                `[Error retreiving info ] - [request - GET]: ${error.message}`,
              )
              next(httpError)
        }
    },

    deleteFriendship: async (req, res, next) => {
        try {
            const { id } = req.params
            const response = await deleteFriend(id)
            endpointResponse({
                res,
                message: 'friendship deleted successfully',
                body: response
            })
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
                `[Error retreiving info ] - [request - GET]: ${error.message}`,
              )
              next(httpError)
        }
    }
}