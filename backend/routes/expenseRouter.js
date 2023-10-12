const express = require('express');

const verifyUser = require('../middleware/verifyUser');
const { postExpense, getExpense } = require('../controllers/expenseController');


const router = express.Router();

router.route('/').post(verifyUser , postExpense);
router.get('/',verifyUser,getExpense);

module.exports = router;