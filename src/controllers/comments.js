const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')
const { getAllComments, getCommentById, createComment, updateComment, deleteComment } = require('../services/comments')

module.exports = {

    getAll: async (req, res, next) => {
        try {
            const response = await getAllComments()
            endpointResponse({
                res,
                message: 'Comments obtained successfully',
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

    getById: async (req, res, next) => {
        try {
            const { id } = req.params
            const response = await getCommentById(id)
            endpointResponse({
                res,
                message: 'Comment obtained successfully',
                body: response
            })
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
                `[Error retreiving info ] - [comment - GET BY ID]: ${error.message}`,
              )
              next(httpError)
        }
    },

    create: async (req, res, next) => {
        try {
            const { body, files } = req
            const token = req.header('Authorization')
            const response = await createComment(token, body, files)
            endpointResponse({
                res,
                message: 'Comment created successfully',
                body: response
            })
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
                `[Error retreiving info ] - [comment - POST]: ${error.message}`,
              )
              next(httpError)
        }
    },

    put: async (req, res, next) => {
        try {
            const { id } = req.params
            const { body, files } = req
            const response = await updateComment(id, body, files)
            endpointResponse({
                res,
                message: 'Comment updated successfully',
                body: response
            })
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
                `[Error retreiving info ] - [comment - PUT]: ${error.message}`,
              )
              next(httpError)
        }
    },

    destroy: async (req, res, next) => {
        try {
            const { id } = req.params
            const response = await deleteComment(id)
            endpointResponse({
                res,
                message: 'Comment deleted successfully',
                body: response
            })
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
                `[Error retreiving info ] - [comment - DELETE]: ${error.message}`,
              )
              next(httpError)
        }
    }
}