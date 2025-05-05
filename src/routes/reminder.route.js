const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const { sendLoanReminders } = require('../controllers/reminder.controller');

router.use(auth);
router.post('/reminders/send', sendLoanReminders);

module.exports = router;
