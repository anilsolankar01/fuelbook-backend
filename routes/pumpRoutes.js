const express = require('express');
const router = express.Router();
const pumpController = require('../controllers/pumpController');

// Routes for pumps
router.get('/', pumpController.getAllPumps);
// Route to get pump details by ID
router.get('/:id', pumpController.getPumpById);

router.post('/', pumpController.createPump);
router.post('/bal', pumpController.getAllPumpBalances); // Get all pump balances
router.get('/balance/:id', pumpController.getPumpBalances)




module.exports = router;
