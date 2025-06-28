const express = require('express');
const router = express.Router();
const {
  sendMessage,
  verifyWebhook,
  receiveWebhook
} = require('../controllers/whatsappController');

router.post('/send-message', sendMessage);
router.get('/webhook', verifyWebhook);

module.exports = router;
