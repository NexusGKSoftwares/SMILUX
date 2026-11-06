const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const auth = require('../middleware/auth');
const tenant = require('../middleware/tenant');

router.get('/stats', auth, tenant, dashboardController.getDashboardStats);

module.exports = router;
