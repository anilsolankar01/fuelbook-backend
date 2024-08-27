const pumpModel = require('../models/pumpModel');

// Get all pumps
const getAllPumps = async (req, res) => {
    console.log('hi .. welcome ... to pumps list ');
    try {
        const pumps = await pumpModel.getAllPumps();
        res.json(pumps);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// Get pump details by ID
const getPumpById = async (req, res) => {
    const pumpId = parseInt(req.params.id, 10);

    if (isNaN(pumpId)) {
        return res.status(400).json({ error: 'Invalid pump ID' });
    }

    try {
        const pump = await pumpModel.getPumpById(pumpId);
        
        if (pump.length === 0) {
            return res.status(404).json({ error: 'Pump not found' });
        }

        res.json(pump[0]); // Send the first item (pump details)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Create a new pump record
const createPump = async (req, res) => {
    try {
        const pump = req.body;
        const result = await pumpModel.createPump(pump);
        res.status(201).json({ id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all pump balances
const getAllPumpBalances = async (req, res) => {
    try {
        const balances = await pumpModel.getAllPumpBalances();
        res.json(balances);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch pump balances' });
    }
};

// Get  pump balances
const getPumpBalances = async (req, res) => {
    const { id } = req.params;
    try {
        const balances = await pumpModel.getPumpBalances(id);
        res.json(balances);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch pump balances' });
    }
};




// Export functions
module.exports = {
    getAllPumps,
    getPumpById,
    createPump,
    getAllPumpBalances,
    getPumpBalances
};
