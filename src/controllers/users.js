const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')
const { getAllUsers, getUserById, updateUserById, deleteUser } = require('../services/users')

module.exports = {
    getAll: async (req, res, next) => {
        try {
            const response = await getAllUsers()
            endpointResponse({
                res,
                message: 'All users obtained successfully',
                body: response
            })
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
                `[Error users listed ] - [users - GET]: ${error.message}`,
              )
              next(httpError)
        }
    },

    getById: async (req, res, next) => {
        try {
            const { id } = req.params
            const response = await getUserById(id)
            endpointResponse({
                res,
                message: 'User obtained successfully',
                body: response
            })
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
                `[Error user listed by id ] - [users - GET BY ID]: ${error.message}`,
              )
              next(httpError)
        }
    },

    update: async (req, res, next) => {
        try {
            const { id } = req.params
            const { body } = req
            const response = await updateUserById(id, body)
            endpointResponse({
                res,
                message: 'User successfully updated ',
                body: response
            })
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
                `[Error updating user ] - [users - PUT]: ${error.message}`,
              )
              next(httpError)
        }
    },

    destroy: async (req, res, next) => {
        try {
            const { id } = req.params
            const response = await deleteUser(id)
            endpointResponse({
                res,
                message: 'User successfully deleted',
                body: response
            })
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
                `[Error deleting user ] - [users - DELETE]: ${error.message}`,
              )
              next(httpError)
        }
    },
}