const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const repaymentController = require('../controllers/repayment.controller');

router.use(auth);

router.post('/', repaymentController.addRepayment);
router.get('/:loanId', repaymentController.getRepayments);

module.exports = router;
