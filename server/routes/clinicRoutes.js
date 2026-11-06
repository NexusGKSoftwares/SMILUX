const express = require('express');
const router = express.Router();
const clinicController = require('../controllers/clinicController');
const auth = require('../middleware/auth');
const tenant = require('../middleware/tenant');

router.use(auth, tenant);

router.get('/profile', clinicController.getClinicProfile);
router.put('/settings', clinicController.updateClinicSettings);
router.post('/branches', clinicController.createBranch);
router.post('/staff', clinicController.createStaffUser);

module.exports = router;
