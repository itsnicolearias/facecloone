const { Router } = require('express')
const { serve, setup } = require('swagger-ui-express')
const { swaggerConfig } = require('../config/swaggerConfig')
const swaggerJSDocs = require('swagger-jsdoc')(swaggerConfig) 

const router = Router()

router.use('/', serve)
router.get('/', setup(swaggerJSDocs))

module.exports = router