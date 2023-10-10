const express= require('express');
const { registerUser, authUser } = require('../controllers/userController');
const User = require('../model/user');
const Expense = require('../model/expense');




const router = express.Router();
router.route('/').post(registerUser);
router.route('/login').post(authUser);


module.exports = router;

User.hasMany(Expense);
Expense.belongsTo(User);