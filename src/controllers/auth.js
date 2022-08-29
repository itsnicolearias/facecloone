const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')
const { Register, Login } = require('../services/auth')

module.exports = {

    register: async (req, res, next) => {
        try {
            const { body } = req
            const response = await Register(body)
            endpointResponse({
                res,
                message: 'User registered succesfully',
                body: response
            })
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
                `[Error retreiving info ] - [users - REGISTER]: ${error.message}`,
              )
              next(httpError)
        }
    },

    login: async(req, res, next) => {
        try {
            const { email, password } = req.body
            const response = await Login(email, password)
            endpointResponse({
                res,
                message: 'User logged successfully',
                body: response
            })
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
                `[Error retreiving info ] - [users - LOGIN]: ${error.message}`,
              )
              next(httpError)
        }
    }
}