const express = require('express');
const verifyUser = require('../middleware/verifyUser');
const {downloadExpense} = require('../controllers/awsS3Controller');

const router = express.Router();

router.route('/').get(verifyUser, downloadExpense);

module.exports = router;