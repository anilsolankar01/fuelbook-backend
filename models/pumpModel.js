const db = require('../config/db');

// Fetch all pumps
const getAllPumps = async () => {
    const [rows] = await db.query('SELECT * FROM pump_details');
    return rows;
};

// Fetch pump details by ID
const getPumpById = async (id) => {
    const [rows] = await db.query('SELECT * FROM pump_details WHERE id = ?', [id]);
    return rows;
};

// Create a new pump record
const createPump = async (pump) => {
    const [result] = await db.query('INSERT INTO pump_details SET ?', [pump]);
    return result;
};

// Get all pump balances
const getAllPumpBalances = async () => {
    const [rows] = await db.query('SELECT * FROM pump_balances');
    return rows;
};

// Get  pump balances
const getPumpBalances = async (pumpid) => {
    const [rows] = await db.query('SELECT * FROM pump_balances WHERE pump_id = ?', [pumpid]);
    return rows;
};

// Export functions
module.exports = {
    getAllPumps,
    getPumpById,
    createPump,
    getAllPumpBalances,
    getPumpBalances
};
