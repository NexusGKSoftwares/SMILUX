const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');
const auth = require('../middleware/auth');
const tenant = require('../middleware/tenant');

router.use(auth, tenant);

router.get('/', inventoryController.getProducts);
router.post('/', inventoryController.createProduct);
router.put('/:id/stock', inventoryController.updateProductQuantity);

module.exports = router;
