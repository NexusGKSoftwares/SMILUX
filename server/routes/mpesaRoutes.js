const express = require('express');
const router = express.Router();
const mpesaController = require('../controllers/mpesaController');
const auth = require('../middleware/auth');
const tenant = require('../middleware/tenant');

router.post('/stkpush', auth, tenant, mpesaController.stkPush);
router.post('/callback', mpesaController.callback);

module.exports = router;
