const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const { setWebhookUrl } = require('../controllers/webhook.controller');

router.use(auth);
router.post('/webhook/register', setWebhookUrl);

module.exports = router;
