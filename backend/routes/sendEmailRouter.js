const express = require('express');
const { resetPassword, sendEmail } = require('../controllers/passwordController');



const router = express.Router();

router.route('/sendEmail').post(sendEmail);
router.route('/resetPassword/:uuid').post(resetPassword )

module.exports = router;