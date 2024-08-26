const db = require('../config/db');

// Create a new payments
const createPayment = async (payment) => {
    const [result] = await db.query('INSERT INTO payments SET ?', [payment]);
    return result;
};

// Fetch all payments
const getAllPayments = async () => {
    const [rows] = await db.query('SELECT * FROM payments');
    return rows;
};

// Fetch payments by pump_id
const getPaymentsByPumpId = async (pumpId) => {
    const [rows] = await db.query('SELECT * FROM payments WHERE pump_id = ?', [pumpId]);
    return rows;
};

module.exports = {
    createPayment,
    getAllPayments,
    getPaymentsByPumpId
}