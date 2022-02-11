var express = require('express')
var router = express.Router()
const conversationController = require('../controller/conversation')
const auth = require('../middleware/auth')
// middleware that is specific to this router
router.use(auth.isAuth)

router.post('/', conversationController.createConversation)

router.get('/', conversationController.getAllConversation)
router.get('/get_all_medias', conversationController.getAllMedias)

router.get('/get_last_conversation', conversationController.getLastConversation)
router.get('/:user_id', conversationController.getConversation)
// modify
router.post('/group', conversationController.createGroupConversation)
router.post('/join_group', conversationController.joinGroupConversation)
router.post('/messages', conversationController.addMessageToConversation)
router.get('/messages/:conversation_id', conversationController.getMessages)
//-----------------

router.put('/:conversationId', function (req, res) {
  res.send('update conversation')
})

router.delete('/:conversationId', conversationController.deleteConversation)

module.exports = router