const { Router } = require('express')
const { getAll, getById, create, put, destroy } = require('../controllers/comments')
const { schemaValidator } = require('../middlewares/validateSchema')
const { validateToken } = require('../middlewares/validateToken')
const { commentBody } = require('../schemas/comments')

const router = Router()

router.get('/',  getAll)
router.get('/:id', getById)
router.post('/', [validateToken, schemaValidator(commentBody)], create)
router.put('/:id', [validateToken, schemaValidator(commentBody)], put)
router.delete('/:id', validateToken, destroy)

module.exports = router