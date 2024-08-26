const pool = require('../config/db');

// Get all drivers
const getAllDrivers = async () => {
    const [rows] = await pool.query('SELECT * FROM drivers');
    return rows;
};

// Get driver by ID
const getDriverById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM drivers WHERE id = ?', [id]);
    return rows[0];
};

// Create a new driver
const createDriver = async (driver) => {
    const [result] = await pool.query('INSERT INTO drivers SET ?', [driver]);
    return result.insertId;
};

// Update driver by ID
const updateDriver = async (id, driver) => {
    const [result] = await pool.query('UPDATE drivers SET ? WHERE id = ?', [driver, id]);
    return result.affectedRows;
};

// Delete driver by ID
const deleteDriver = async (id) => {
    const [result] = await pool.query('DELETE FROM drivers WHERE id = ?', [id]);
    return result.affectedRows;
};

module.exports = {
    getAllDrivers,
    getDriverById,
    createDriver,
    updateDriver,
    deleteDriver
};
