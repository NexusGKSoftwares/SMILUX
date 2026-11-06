const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const auth = require('../middleware/auth');
const tenant = require('../middleware/tenant');

router.get('/financial', auth, tenant, reportController.getFinancialReport);

module.exports = router;
