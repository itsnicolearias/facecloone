const { Router } = require('express')
const { getAll, getById, create, put, destroy } = require('../controllers/posts')
const { validateToken } = require('../middlewares/validateToken')
const verifyOwnership = require('../middlewares/verifyOwnership')
const { Post } = require('../models/post')

const router = Router()

router.get('/', getAll)
router.get('/:id', getById)
router.post('/', validateToken, create)
router.put('/:id', validateToken, verifyOwnership('Post'), put)
router.delete('/:id', validateToken, destroy)

module.exports = router