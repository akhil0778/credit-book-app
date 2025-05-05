const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const { generateReceipt } = require('../controllers/receipt.controller');

router.use(auth);

router.get('/repayment/:repaymentId/receipt', generateReceipt);

module.exports = router;
