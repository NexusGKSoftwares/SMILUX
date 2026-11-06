const express = require('express');
const router = express.Router();
const dentalChartController = require('../controllers/dentalChartController');
const auth = require('../middleware/auth');
const tenant = require('../middleware/tenant');

router.use(auth, tenant);

router.get('/:patientId', dentalChartController.getDentalChart);
router.post('/:patientId/tooth', dentalChartController.updateToothCondition);

module.exports = router;
