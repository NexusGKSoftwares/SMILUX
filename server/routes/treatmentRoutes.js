const express = require('express');
const router = express.Router();
const treatmentController = require('../controllers/treatmentController');
const auth = require('../middleware/auth');
const tenant = require('../middleware/tenant');

router.use(auth, tenant);

router.get('/', treatmentController.getTreatments);
router.post('/', treatmentController.createTreatment);

router.get('/plans', treatmentController.getTreatmentPlans);
router.post('/plans', treatmentController.createTreatmentPlan);
router.post('/plans/:id/convert-to-invoice', treatmentController.convertToInvoice);

module.exports = router;
