const express = require('express');
const sendEmail = require('../controllers/passwordController');



const router = express.Router();

router.route('/sendEmail').post(sendEmail);

module.exports = router;