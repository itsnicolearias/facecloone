const { Router } = require('express')
const { register, login } = require('../controllers/auth')
const { schemaValidator } = require('../middlewares/validateSchema')
const { registerBody, loginBody } = require('../schemas/users')

const router = Router()

router.post('/register', schemaValidator(registerBody), register)
router.post('/login', schemaValidator(loginBody), login)

module.exports = router