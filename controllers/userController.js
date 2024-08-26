const userModel = require('../models/userModel');

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.getAllUsers();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create a new user
const createUser = async (req, res) => {
    try {
        const user = req.body;
        const result = await userModel.createUser(user);
        res.status(201).json({ id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const setFuelDispense = async (req,res) => {
    try {
        const { token_id } = req.body; // Extract token_id from the request body
        const result = await userModel.setFuelDispense(token_id);
        res.status(201).json({ result });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Export functions
module.exports = {
    getAllUsers,
    createUser,
    setFuelDispense
};
