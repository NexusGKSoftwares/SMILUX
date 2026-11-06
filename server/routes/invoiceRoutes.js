const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');
const auth = require('../middleware/auth');
const tenant = require('../middleware/tenant');

router.use(auth, tenant);

router.get('/', invoiceController.getInvoices);
router.post('/', invoiceController.createInvoice);
router.get('/payments', invoiceController.getPayments);
router.post('/payments', invoiceController.recordPayment);
router.get('/:id', invoiceController.getInvoiceById);

module.exports = router;
