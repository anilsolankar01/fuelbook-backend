const express = require('express');
const router = express.Router();
const fuelController = require('../controllers/fuelController');

// Define routes
router.get('/', fuelController.getAllFuelTokens);
router.get('/:id', fuelController.getFuelTokenById);
// Route to get fuel token by token ID
router.get('/token/:token_id', fuelController.getFuelTokenByTokenId);
// Route to update fuel_dispensed status by token_id
router.put('/token/:token_id/dispense', fuelController.updateFuelDispensed);
router.get('/by-pump/:pumpId', fuelController.getFuelTokensByPumpId);
router.post('/', fuelController.createFuelToken);
router.put('/:id', fuelController.updateFuelToken);
router.delete('/:id', fuelController.deleteFuelToken);



module.exports = router;
