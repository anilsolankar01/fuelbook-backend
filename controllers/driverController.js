const driverModel = require('../models/driverModel');

// Get all drivers
const getAllDrivers = async (req, res) => {
    try {
        const drivers = await driverModel.getAllDrivers();
        res.json(drivers);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch drivers' });
    }
};

// Get driver by ID
const getDriverById = async (req, res) => {
    const { id } = req.params;
    try {
        const driver = await driverModel.getDriverById(id);
        if (driver) {
            res.json(driver);
        } else {
            res.status(404).json({ error: 'Driver not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch driver' });
    }
};

// Create a new driver
const createDriver = async (req, res) => {
    const driver = req.body;
    try {
        const id = await driverModel.createDriver(driver);
        res.status(201).json({ id });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create driver' });
    }
};

// Update driver by ID
const updateDriver = async (req, res) => {
    const { id } = req.params;
    const driver = req.body;
    try {
        const affectedRows = await driverModel.updateDriver(id, driver);
        if (affectedRows > 0) {
            res.json({ message: 'Driver updated successfully' });
        } else {
            res.status(404).json({ error: 'Driver not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update driver' });
    }
};

// Delete driver by ID
const deleteDriver = async (req, res) => {
    const { id } = req.params;
    try {
        const affectedRows = await driverModel.deleteDriver(id);
        if (affectedRows > 0) {
            res.json({ message: 'Driver deleted successfully' });
        } else {
            res.status(404).json({ error: 'Driver not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete driver' });
    }
};

module.exports = {
    getAllDrivers,
    getDriverById,
    createDriver,
    updateDriver,
    deleteDriver
};
