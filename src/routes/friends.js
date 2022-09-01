const { Router } = require('express')
const { deleteFriendship, list, listPending, listSended, accept, decline, destroy, send } = require('../controllers/friends')
const { validateToken } = require('../middlewares/validateToken')

const router = Router()

router.get('/', [validateToken], list)
router.get('/pending', listPending)
router.get('/sended', listSended)

router.post('/add/:id', send)

router.put('/accept/:id', accept)
router.put('/decline/:id', decline)

router.delete('/:id', [validateToken], deleteFriendship)
router.delete('/cancel/:id', destroy)

module.exports = router