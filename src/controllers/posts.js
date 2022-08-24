const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')
const { getAllPost, getPostById, createPost, updatePost, deletePost, getPostComments } = require('../services/posts')

module.exports = {
    getAll: async(req, res, next) => {
        try {
            const response = await getAllPost()
            endpointResponse({
                res,
                message: 'All post obtained successfully',
                body: response
            })
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
                `[Error retreiving info ] - [post - GET]: ${error.message}`,
              )
              next(httpError)
        }
    },

    getById: async (req, res, next) => {
        try {
            const { id } = req.params
            const response = await getPostById(id)
            endpointResponse({
                res,
                message: 'Post obtained successfully',
                body: response
            })
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
                `[Error retreiving info ] - [post - GET BY ID]: ${error.message}`,
              )
              next(httpError)
        }
    },

    create: async(req, res, next) => {
        try {
            const { body, files } = req
            const token = req.header('Authorization')
            const response = await createPost(token, body, files)
            endpointResponse({
                res,
                message: 'Post created successfully',
                body: response
            })
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
                `[Error retreiving info ] - [post - POST]: ${error.message}`,
              )
              next(httpError)
        }
    },

    put: async(req, res, next) => {
        try {
            const { id } = req.params
            const { body, files } = req
            const response = await updatePost(id, body, files)
            endpointResponse({
                res,
                message: 'Post updated successfully',
                body: response
            })
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
                `[Error retreiving info ] - [post - PUT]: ${error.message}`,
              )
              next(httpError) 
        }
    },

    destroy: async (req, res, next) => {
        try {
            const { id } = req.params
            const response = await deletePost(id)
            endpointResponse({
                res,
                message: 'Post deleted successfully',
                body: response
            })
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
                `[Error retreiving info ] - [post - DELETE]: ${error.message}`,
              )
              next(httpError)
        }
    },

    getComments: async (req, res, next) => {
        try {
            const { id } = req.params
            const response = await getPostComments(id)
            endpointResponse({
                res,
                message: 'Comments of post obtained successfully',
                body: response
            })
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
                `[Error retreiving info ] - [post - GET COMMENTS]: ${error.message}`,
              )
              next(httpError)
        }
    }
}