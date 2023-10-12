const express = require('express');
const verifyUser = require('../middleware/verifyUser');
const { createDashboard } = require('../controllers/premiumController');


const router = express.Router();

router.route('/').get(createDashboard)


module.exports = router;