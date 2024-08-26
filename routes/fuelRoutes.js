const express = require('express');
const router = express.Router();
const fuelController = require('../controllers/fuelController');

// Define routes
router.get('/', fuelController.getAllFuelTokens);
router.get('/:id', fuelController.getFuelTokenById);
router.get('/by-pump/:pumpId', fuelController.getFuelTokensByPumpId);
router.post('/', fuelController.createFuelToken);
router.put('/:id', fuelController.updateFuelToken);
router.delete('/:id', fuelController.deleteFuelToken);



module.exports = router;
