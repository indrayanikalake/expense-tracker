const express = require('express');
const verifyUser = require('../middleware/verifyUser');
const { createOrder, verifyPayment } = require('../controllers/paymentController');
const { updateExpense, deleteExpense } = require('../controllers/expenseController');

const router = express.Router();

router.post('/payment', createOrder);
router.route('/verifypayment').post(verifyUser, verifyPayment);
router.put('/user/:id',verifyUser,updateExpense);
router.delete('/userdelete/:id',verifyUser,deleteExpense);


module.exports = router;