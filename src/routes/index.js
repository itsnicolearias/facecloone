const { Router } = require('express')
const auth = require('./auth')
const users = require('./users')
const posts = require('./posts')

const router = Router()

router.get('/', (req, res) => {
    res.send('Welcome')
})
router.use('/auth', auth)
router.use('/users', users)
router.use('/posts', posts)

module.exports = router