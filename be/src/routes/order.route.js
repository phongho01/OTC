const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');

router.get('/', orderController.index);
router.get('/maker/:makerAddress', orderController.maker);
router.get('/taker/:takerAddress', orderController.taker);
router.post('/', orderController.create);

module.exports = router;