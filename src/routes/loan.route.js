const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const loanController = require('../controllers/loan.controller');

router.use(auth);

router.post('/', loanController.create); // Create new loan
router.get('/', loanController.getAll); // Get all user loans
router.get('/customer/:customerId', loanController.getByCustomer); // Loans by customer

module.exports = router;
