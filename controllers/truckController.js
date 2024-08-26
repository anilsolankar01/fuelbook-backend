const truckModel = require('../models/truckModel');

// Get all trucks
const getAllTrucks = async (req, res) => {
    try {
        const trucks = await truckModel.getAllTrucks();
        res.json(trucks);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch trucks' });
    }
};

// Get truck by ID
const getTruckById = async (req, res) => {
    const { id } = req.params;
    try {
        const truck = await truckModel.getTruckById(id);
        if (truck) {
            res.json(truck);
        } else {
            res.status(404).json({ error: 'Truck not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch truck' });
    }
};

// Create a new truck
const createTruck = async (req, res) => {
    const truck = req.body;
    try {
        const id = await truckModel.createTruck(truck);
        res.status(201).json({ id });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create truck' });
    }
};

// Update truck by ID
const updateTruck = async (req, res) => {
    const { id } = req.params;
    const truck = req.body;
    try {
        const affectedRows = await truckModel.updateTruck(id, truck);
        if (affectedRows > 0) {
            res.json({ message: 'Truck updated successfully' });
        } else {
            res.status(404).json({ error: 'Truck not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update truck' });
    }
};

// Delete truck by ID
const deleteTruck = async (req, res) => {
    const { id } = req.params;
    try {
        const affectedRows = await truckModel.deleteTruck(id);
        if (affectedRows > 0) {
            res.json({ message: 'Truck deleted successfully' });
        } else {
            res.status(404).json({ error: 'Truck not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete truck' });
    }
};

module.exports = {
    getAllTrucks,
    getTruckById,
    createTruck,
    updateTruck,
    deleteTruck
};
