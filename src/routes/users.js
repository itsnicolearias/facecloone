const { Router } = require('express')
const { getAll, getById, update, destroy } = require('../controllers/users')
const { validateToken } = require('../middlewares/validateToken')
const verifyOwnership = require('../middlewares/verifyOwnership')

const router = Router()

router.get('/', getAll)
router.get('/:id', getById)
router.put('/:id', [validateToken, verifyOwnership('User')], update)
router.delete('/:id', [validateToken, verifyOwnership('User')], destroy)

module.exports = router