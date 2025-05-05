const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const customerController = require('../controllers/customer.controller');

router.use(auth);
router.get('/', customerController.getAll);
router.post('/', customerController.add);
router.put('/:id', customerController.update);
router.delete('/:id', customerController.remove);

module.exports = router;
