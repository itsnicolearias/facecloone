const { Router } = require('express')
const { send, destroy, listPending, listSended } = require('../controllers/friends')

const router = Router()

router.post('/send', send)
router.delete('/delete/:id', destroy)
router.get('/pending', listPending)
router.get('/sended', listSended)

module.exports = router