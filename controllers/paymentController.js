const paymentModel = require('../models/paymentModel');

// Create a new pump record
const createPayment = async (req, res) => {
    try {
        const payment = req.body;
        const result = await paymentModel.createPayment(payment);
        res.status(201).json({ id: result });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getAllPayments = async (req,res) => {
    try {
        const payments = await paymentModel.getAllPayments();
        res.status(201).json(payments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
     
}

// New function to fetch payments by pump_id
const getPaymentsByPumpId = async (req, res) => {
    const { pumpId } = req.params;
    try {
        const payments = await paymentModel.getPaymentsByPumpId(pumpId);
        if (payments.length === 0) {
            return res.status(404).json({ message: 'No payments found for this pump' });
        }
        res.status(200).json(payments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createPayment,
    getAllPayments,
    getPaymentsByPumpId
}