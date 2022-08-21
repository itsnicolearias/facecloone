const { Router } = require('express')
const { register, login } = require('../controllers/auth')
const { schemaValidator } = require('../middlewares/validateSchema')
const { registerBody, loginBody } = require('../schemas/users')

const router = Router()

router.post('/register',  register)
router.post('/login',  login)

module.exports = router