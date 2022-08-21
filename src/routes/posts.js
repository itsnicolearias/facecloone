const { Router } = require('express')
const { getAll, getById, create, put, destroy } = require('../controllers/posts')

const router = Router()

router.get('/', getAll)
router.get('/:id', getById)
router.post('/', create)
router.put('/:id', put)
router.delete('/:id', destroy)

module.exports = router