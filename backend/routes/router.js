const express= require('express');
const { registerUser, authUser, getUser } = require('../controllers/userController');
const User = require('../model/user');
const Expense = require('../model/expense');
const verifyUser = require('../middleware/verifyUser');




const router = express.Router();
router.route('/').post(registerUser).get(verifyUser,getUser);
router.route('/login').post(authUser);


module.exports = router;

/*
User.hasMany(Expense);
Expense.belongsTo(User);
*/