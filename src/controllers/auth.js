const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')
const { Register, Login } = require('../services/auth')

module.exports = {

    register: async (req, res, next) => {
        try {
            const user = req.body
            const response = await Register(user)
            endpointResponse({
                res,
                message: 'User registered succesfully',
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

    login: async(req, res, next) => {
        try {
            const { email, password } = req.body
            const response = await Login(email, password)
            endpointResponse({
                res,
                message: 'User loggued successfully',
                body: response
            })
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
                `[Error users listed ] - [users - GET]: ${error.message}`,
              )
              next(httpError)
        }
    }
}