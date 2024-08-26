const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

//Routes for payments

router.post('/',paymentController.createPayment);
router.get('/',paymentController.getAllPayments);
// Add this route for fetching payments by pump_id
router.get('/pump/:pumpId', paymentController.getPaymentsByPumpId);

module.exports = router;
