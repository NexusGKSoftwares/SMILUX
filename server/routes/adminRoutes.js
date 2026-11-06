const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');
const rbac = require('../middleware/rbac');

router.get('/dashboard', auth, rbac(['SuperAdmin']), adminController.getAdminDashboard);

module.exports = router;
