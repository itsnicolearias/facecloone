const { Router } = require('express')
const { getAll, getById, create, put, destroy, getComments, deleteComments } = require('../controllers/posts')
const { schemaValidator } = require('../middlewares/validateSchema')
const { validateToken } = require('../middlewares/validateToken')
const verifyOwnership = require('../middlewares/verifyOwnership')
const { postBody } = require('../schemas/post')

const router = Router()

router.get('/', getAll)
router.get('/:id', getById)
router.post('/', [validateToken, schemaValidator(postBody)], create)
router.put('/:id', [validateToken, verifyOwnership('Post'), schemaValidator(postBody)], put)
router.delete('/:id', [validateToken, verifyOwnership('Post')], destroy)
router.get('/:id/comments', getComments)
router.delete('/:id/comments', deleteComments)

module.exports = router