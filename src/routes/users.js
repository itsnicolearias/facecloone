const { Router } = require('express')
const { getAll, getById, update, destroy } = require('../controllers/users')

const router = Router()

router.get('/', getAll)
router.get('/:id', getById)
router.put('/:id', update)
router.delete('/:id', destroy)

module.exports = router