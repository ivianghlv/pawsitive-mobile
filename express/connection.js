const mysql = require('mysql2');

// Configure the MySQL connection
const database = mysql.createConnection({
    host: '192.168.130.209',  // Your MySQL host
    user: 'root',             // MySQL user
    password: 'password',     // MySQL password
    database: 'pawsitive_db', // Database for PawsitiveMobileApp
});

database.connect((err) => {
    if (err) {
        console.log('-> DATABASE NOT CONNECTED');
        return;
    }
    console.log('-> DATABASE CONNECTED SUCCESSFULLY');
});

module.exports = database;
