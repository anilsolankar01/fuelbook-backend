const promisePool = require('./db'); // Adjust the path accordingly

const initializeDatabase = async () => {
    const sqlQueries = [
        `USE fuelbook;`,

        `CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            role ENUM('token_generator', 'fuel_attendant') NOT NULL
        );`,

        `CREATE TABLE IF NOT EXISTS trucks (
            id INT AUTO_INCREMENT PRIMARY KEY,
            registration_number VARCHAR(255) NOT NULL,
            truck_type VARCHAR(255) NOT NULL,
            ownership VARCHAR(255) NOT NULL,
            status ENUM('active', 'disactive') NOT NULL DEFAULT 'active'
        );`,



        `CREATE TABLE IF NOT EXISTS drivers (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            contact VARCHAR(255),
            address VARCHAR(255),
            driving_license VARCHAR(255) NOT NULL,
            ownership VARCHAR(255) NOT NULL
        );`,

        `CREATE TABLE IF NOT EXISTS pump_details (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            location VARCHAR(255) NOT NULL,
            initial_amount DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
            contact VARCHAR(20) NOT NULL
        );`,

        `CREATE TABLE IF NOT EXISTS pump_balances (
            id INT AUTO_INCREMENT PRIMARY KEY,
            pump_id INT NOT NULL,
            balance DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
            last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY (pump_id) REFERENCES pump_details(id)
        );`,

        `CREATE TABLE IF NOT EXISTS fuels (
            id INT AUTO_INCREMENT PRIMARY KEY,
            token_id VARCHAR(255) NOT NULL UNIQUE,
            pump_id INT NOT NULL,
            fuel_type VARCHAR(50) NOT NULL,
            fuelRate DECIMAL(10, 2) NOT NULL,
            fuelLtr DECIMAL(10, 2) NOT NULL,
            amount DECIMAL(10, 2) NOT NULL,
            driver_id INT NOT NULL,
            truck_id INT NOT NULL,
            kmReadingCurrent INT NOT NULL,
            kmReadingAfter INT,
            km_reading_photo_url VARCHAR(255) NOT NULL,
            bill_photo_url VARCHAR(255) NOT NULL,
            km_reading_photo_url2 VARCHAR(255),
            bill_photo_url2 VARCHAR(255),
            status ENUM('not verified', 'verified') DEFAULT 'not verified',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            qr_code VARCHAR(255) NOT NULL,
            generated_by INT NOT NULL,
            fuel_attendant_id INT,
            fuel_dispensed BOOLEAN DEFAULT FALSE,
            FOREIGN KEY (pump_id) REFERENCES pump_details(id),
            FOREIGN KEY (driver_id) REFERENCES drivers(id),
            FOREIGN KEY (truck_id) REFERENCES trucks(id),
            FOREIGN KEY (generated_by) REFERENCES users(id),
            FOREIGN KEY (fuel_attendant_id) REFERENCES users(id)
        );`,

        `CREATE TABLE IF NOT EXISTS payments (
            id INT AUTO_INCREMENT PRIMARY KEY,
            pump_id INT NOT NULL,
            amount DECIMAL(10, 2) NOT NULL,
            payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (pump_id) REFERENCES pump_details(id)
        );`,
        
        `ALTER TABLE payments
        ADD COLUMN method ENUM('cash', 'online','cheque') NOT NULL DEFAULT 'online';`,
        
        `CREATE TRIGGER update_balance_after_payment_insert
        AFTER INSERT ON payments
        FOR EACH ROW
        BEGIN
            UPDATE pump_balances 
            SET balance = balance - NEW.amount,
                last_updated = CURRENT_TIMESTAMP
            WHERE pump_id = NEW.pump_id;
        END;`,

        `CREATE TRIGGER update_pump_balance_after_fuel_dispensed
        AFTER UPDATE ON fuels
        FOR EACH ROW
        BEGIN
            IF NEW.fuel_dispensed = TRUE AND OLD.fuel_dispensed = FALSE THEN
                UPDATE pump_balances
                SET balance = balance + NEW.amount
                WHERE pump_id = NEW.pump_id;
            END IF;
        END;`,

        `CREATE TRIGGER insert_initial_balance
        AFTER INSERT ON pump_details
        FOR EACH ROW
        BEGIN
            INSERT INTO pump_balances (pump_id, balance)
            VALUES (NEW.id, NEW.initial_amount);
        END;`
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
