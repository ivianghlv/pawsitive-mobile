const mysql = require('mysql2');

// Configure the MySQL connection
const database = mysql.createConnection({
    host: '192.168.120.209',  // Your MySQL host
    user: 'root',             // MySQL user
    password: 'password',     // MySQL password
    database: 'pawsitive_db', // Database for PawsitiveMobileApp
});

module.exports = database;
