const express = require('express');
const router = express.Router();
const insuranceController = require('../controllers/insuranceController');
const auth = require('../middleware/auth');
const tenant = require('../middleware/tenant');

router.use(auth, tenant);

router.get('/providers', insuranceController.getProviders);
router.post('/providers', insuranceController.createProvider);

router.get('/claims', insuranceController.getClaims);
router.post('/claims', insuranceController.createClaim);
router.put('/claims/:id', insuranceController.updateClaimStatus);

module.exports = router;
