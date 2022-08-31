const { Router } = require('express')
const { send, destroy, listPending, listSended, accept, decline } = require('../controllers/friends')

const router = Router()

router.post('/send', send)
router.delete('/delete/:id', destroy)
router.get('/pending', listPending)
router.get('/sended', listSended)
router.post('/accept/:id', accept)
router.post('/decline/:id', decline)

module.exports = router