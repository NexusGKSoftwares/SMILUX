const express = require('express');
const router = express.Router();
const supportController = require('../controllers/supportController');
const auth = require('../middleware/auth');

router.use(auth);

router.get('/', supportController.getTickets);
router.post('/', supportController.createTicket);
router.post('/:id/reply', supportController.addReply);

module.exports = router;
