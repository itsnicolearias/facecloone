const { Router } = require('express')
const { serve, setup } = require('swagger-ui-express')
const swagger = require('../config/swagger/swagger.json')

const router = Router()

router.use('/', serve)
router.get('/', setup(swagger))

module.exports = router