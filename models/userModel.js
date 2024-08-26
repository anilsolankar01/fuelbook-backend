const db = require('../config/db');

// Fetch all users
const getAllUsers = async () => {
    const [rows] = await db.query('SELECT * FROM users');
    return rows;
};

// Create a new user
const createUser = async (user) => {
    const [result] = await db.query('INSERT INTO users SET ?', [user]);
    return result;
};

// Create a new 
const setFuelDispense = async (token_id) => {
    const [result] = await db.query('UPDATE fuels SET fuel_dispensed = TRUE WHERE token_id = ?', [token_id]);
    return result;
};


// Export functions
module.exports = {
    getAllUsers,
    createUser,
    setFuelDispense
};
