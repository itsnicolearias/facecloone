const { Router } = require('express')
const auth = require('./auth')
const users = require('./users')

const router = Router()

router.get('/', (req, res) => {
    res.send('Welcome')
})
router.use('/auth', auth)
router.use('/users', users)

module.exports = router