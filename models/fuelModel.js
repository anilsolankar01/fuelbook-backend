const pool = require('../config/db');

// Get all fuel tokens
const getAllFuelTokens = async () => {
    const [rows] = await pool.query('SELECT * FROM fuels');
    return rows;
};

// Get fuel token by ID
const getFuelTokenById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM fuels WHERE id = ?', [id]);
    return rows[0];
};
// Get fuel token by token ID
const getFuelTokenByTokenId = async (token_id) => {
    const [rows] = await pool.query('SELECT * FROM fuels WHERE token_id = ?', [token_id]);
    return rows[0];
};

// Update fuel_dispensed by token_id
const updateFuelDispensedByTokenId = async (token_id) => {
    const [result] = await pool.query('UPDATE fuels SET fuel_dispensed = TRUE WHERE token_id = ?', [token_id]);
    return result.affectedRows;
};

// Create a new fuel token
const createFuelToken = async (fuelToken) => {
    const [result] = await pool.query('INSERT INTO fuels SET ?', [fuelToken]);
    return result.insertId;
};

// Update fuel token by ID
const updateFuelToken = async (id, fuelToken) => {
    const [result] = await pool.query('UPDATE fuels SET ? WHERE id = ?', [fuelToken, id]);
    return result.affectedRows;
};

// Delete fuel token by ID
const deleteFuelToken = async (id) => {
    const [result] = await pool.query('DELETE FROM fuels WHERE id = ?', [id]);
    return result.affectedRows;
};

// Get fuel tokens by pump ID
const getFuelTokensByPumpId = async (pumpId) => {
    const [rows] = await pool.query('SELECT * FROM fuels WHERE pump_id = ?', [pumpId]);
    return rows;
};

module.exports = {
    getAllFuelTokens,
    getFuelTokenById,
    createFuelToken,
    updateFuelToken,
    deleteFuelToken,
    getFuelTokensByPumpId,
    getFuelTokenByTokenId,
    updateFuelDispensedByTokenId
};
