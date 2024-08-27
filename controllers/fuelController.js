const fuelModel = require('../models/fuelModel');

// Get all fuel tokens
const getAllFuelTokens = async (req, res) => {
    try {
        const fuelTokens = await fuelModel.getAllFuelTokens();
        res.json(fuelTokens);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch fuel tokens' });
    }
};

// Get fuel token by ID
const getFuelTokenById = async (req, res) => {
    const { id } = req.params;
    try {
        const fuelToken = await fuelModel.getFuelTokenById(id);
        if (fuelToken) {
            res.json(fuelToken);
        } else {
            res.status(404).json({ error: 'Fuel token not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch fuel token' });
    }
};

// Get fuel token by token ID
const getFuelTokenByTokenId = async (req, res) => {
    const { token_id } = req.params; // Extract token_id from request parameters
    console.log(token_id);
    try {
        const fuelToken = await fuelModel.getFuelTokenByTokenId(token_id);

        if (!fuelToken) {
            return res.status(404).json({ error: 'Fuel token not found' });
        }

        res.json(fuelToken);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch fuel token' });
    }
};

// Update fuel_dispensed by token_id
const updateFuelDispensed = async (req, res) => {
    const { token_id } = req.params;

    try {
        const affectedRows = await fuelModel.updateFuelDispensedByTokenId(token_id);

        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Fuel token not found or already dispensed' });
        }

        res.json({ message: 'Fuel dispensed status updated successfully' });
    } catch (error) {
        console.error('Error updating fuel dispensed status:', error);
        res.status(500).json({ error: 'Failed to update fuel dispensed status' });
    }
};


const getFuelTokensByPumpId = async (req, res) => {
    const { pumpId } = req.params;
    try {
        const fuelTokens = await fuelModel.getFuelTokensByPumpId(pumpId);
        if (fuelTokens.length > 0) {
            res.json(fuelTokens);
        } else {
            res.status(404).json({ error: 'No fuel tokens found for this pump' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch fuel tokens' });
    }
};

// Create a new fuel token
const createFuelToken = async (req, res) => {
    const fuelToken = req.body;
    try {
        const id = await fuelModel.createFuelToken(fuelToken);
        res.status(201).json({ id });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create fuel token' });
    }
};

// Update fuel token by ID
const updateFuelToken = async (req, res) => {
    const { id } = req.params;
    const fuelToken = req.body;
    try {
        const affectedRows = await fuelModel.updateFuelToken(id, fuelToken);
        if (affectedRows > 0) {
            res.json({ message: 'Fuel token updated successfully' });
        } else {
            res.status(404).json({ error: 'Fuel token not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update fuel token' });
    }
};

// Delete fuel token by ID
const deleteFuelToken = async (req, res) => {
    const { id } = req.params;
    try {
        const affectedRows = await fuelModel.deleteFuelToken(id);
        if (affectedRows > 0) {
            res.json({ message: 'Fuel token deleted successfully' });
        } else {
            res.status(404).json({ error: 'Fuel token not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete fuel token' });
    }
};

module.exports = {
    getAllFuelTokens,
    getFuelTokenById,
    createFuelToken,
    updateFuelToken,
    deleteFuelToken,
    getFuelTokensByPumpId,
    getFuelTokenByTokenId,
    updateFuelDispensed
};
