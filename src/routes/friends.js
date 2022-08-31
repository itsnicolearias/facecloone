const { Router } = require('express')
const { deleteFriendship, list } = require('../controllers/friends')
const { validateToken } = require('../middlewares/validateToken')

const router = Router()

router.get('/', [validateToken], list)
router.delete('/:id', [validateToken], deleteFriendship)

module.exports = router