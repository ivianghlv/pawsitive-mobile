const express = require('express');
const router = express.Router();
const database = require('../connection'); // Import MySQL connection from your `connection.js`
const bcrypt = require('bcrypt');

// POST route for creating a new user (sign-up)
router.post('/sign-up', async (req, res) => {
    const { name, email, password } = req.body;

    // Validate input data
    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Name, email, and password are required.' });
    }

    try {
        // Check if the email already exists in the database
        const checkUserSql = 'SELECT * FROM users WHERE email = ?';
        const [existingUser] = await database.promise().query(checkUserSql, [email]);

        if (existingUser.length > 0) {
            return res.status(400).json({ error: 'This email is already registered.' });
        }

        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user into the database
        const insertUserSql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
        await database.promise().query(insertUserSql, [name, email, hashedPassword]);

        console.log('-> New user registered successfully');
        // Return a success message to the client
        res.status(201).json({ 
            message: 'Account created successfully!', 
            redirect: '/login' // Add a redirect path if needed
        });
    } catch (error) {
        console.error('Error during sign-up:', error);
        res.status(500).json({ error: 'Failed to create account. Please try again.' });
    }
});

module.exports = router;
