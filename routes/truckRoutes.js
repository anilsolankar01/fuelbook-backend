const express = require('express');
const router = express.Router();
const truckController = require('../controllers/truckController');

// Define routes
router.get('/', truckController.getAllTrucks);
router.get('/:id', truckController.getTruckById);
router.post('/', truckController.createTruck);
router.put('/:id', truckController.updateTruck);
router.delete('/:id', truckController.deleteTruck);

module.exports = router;
