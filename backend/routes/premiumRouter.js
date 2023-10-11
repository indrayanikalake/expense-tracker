const express = require('express');
const verifyUser = require('../middleware/verifyUser');
const { createDashboard } = require('../controllers/premiumController');


const router = express.Router();

router.route('/showDashboard').get(verifyUser,createDashboard)


module.exports = router;