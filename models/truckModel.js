const pool = require('../config/db');

// Get all trucks
const getAllTrucks = async () => {
    const [rows] = await pool.query('SELECT * FROM trucks');
    return rows;
};

// Get truck by ID
const getTruckById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM trucks WHERE id = ?', [id]);
    return rows[0];
};

// Create a new truck
const createTruck = async (truck) => {
    const [result] = await pool.query('INSERT INTO trucks SET ?', [truck]);
    return result.insertId;
};

// Update truck by ID
const updateTruck = async (id, truck) => {
    try {
        const [result] = await pool.query('UPDATE trucks SET ? WHERE id = ?', [truck, id]);
        return result.affectedRows;
    } catch (error) {
        console.error('Error updating truck:', error);
        throw new Error('Failed to update truck');
    }
};
// Delete truck by ID
const deleteTruck = async (id) => {
    const [result] = await pool.query('DELETE FROM trucks WHERE id = ?', [id]);
    return result.affectedRows;
};

module.exports = {
    getAllTrucks,
    getTruckById,
    createTruck,
    updateTruck,
    deleteTruck
};
