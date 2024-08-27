const promisePool = require('./db'); // Adjust the path accordingly

const initializeDatabase = async () => {
    const sqlQueries = [
        `ALTER TABLE drivers ADD COLUMN status VARCHAR(255) NOT NULL DEFAULT 'active';`,

    ];

    try {
        for (const query of sqlQueries) {
            await promisePool.query(query);
        }
        console.log('Database initialized successfully');
    } catch (error) {
        console.error('Error initializing database:', error);
    }
};

module.exports = initializeDatabase;
