const express = require('express');
const app = express();
const dotenv = require('dotenv');
const fuelRoutes = require('./routes/fuelRoutes');
const pumpRoutes = require('./routes/pumpRoutes');
const userRoutes = require('./routes/userRoutes');
const driverRoutes = require('./routes/driverRoutes');
const truckRoutes = require('./routes/truckRoutes'); // Add this line
const errorHandler = require('./utils/errorHandler');
const cors = require('cors');
const paymentRoutes = require('./routes/paymentRoutes');
const initializeDatabase = require('./config/initializeDatabase');

// Load environment variables from .env file
dotenv.config();

// Middleware
app.use(express.json()); // To parse JSON bodies
app.use(cors());
// Routes
app.use('/api/fuels', fuelRoutes);
app.use('/api/pumps', pumpRoutes);
app.use('/api/users', userRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/trucks', truckRoutes); // Add this line
app.use('/api/payments', paymentRoutes);

// Error handling middleware
app.use(errorHandler);
initializeDatabase();
// Start server
const PORT = process.env.PORT || 5000; // Use environment variable for port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
