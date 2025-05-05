const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const { getSummary } = require('../controllers/summary.controller');
const { getOverdueLoans } = require('../controllers/overdue.controller');

router.use(auth);

router.get('/summary', getSummary);
router.get('/overdue', getOverdueLoans);

module.exports = router;
