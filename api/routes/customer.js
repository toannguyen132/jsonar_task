const express = require('express');
const router = express.Router();
const controller = require('../controllers/customerController');

router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/:id/orders', controller.showOrder);
router.get('/:id/orders/:orderId', controller.showOrderDetails);

module.exports = router;