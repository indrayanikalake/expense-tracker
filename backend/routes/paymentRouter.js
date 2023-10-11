const express = require('express');
const verifyUser = require('../middleware/verifyUser');
const { createOrder, verifyPayment } = require('../controllers/paymentController');

const router = express.Router();

router.post('/payment',verifyPayment, createOrder);
router.route('/verifypayment').post(verifyUser, verifyPayment)


module.exports = router;