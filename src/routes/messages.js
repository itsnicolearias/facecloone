const { Router } = require('express')
const { get, getById, create, destroy } = require('../controllers/messages')
const { validateToken } = require('../middlewares/validateToken')
const verifyOwnership = require('../middlewares/verifyOwnership')

const router = Router()

router.get('/', [validateToken], get)
router.get('/:id', [validateToken], getById)
router.post('/', [validateToken], create)
router.delete('/:id', [validateToken, verifyOwnership('Message')], destroy)

module.exports = router