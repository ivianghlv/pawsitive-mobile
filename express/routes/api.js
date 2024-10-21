const express = require('express');
const router = express.Router();
const database = require('../connection'); // Import your MySQL connection
const bcrypt = require('bcrypt');

// Function to format the date from 'DD/MM/YYYY' to 'YYYY-MM-DD'
function formatDateString(dateString) {
    const parts = dateString.split('/'); // Split into [day, month, year]
    return `${parts[2]}-${parts[1]}-${parts[0]}`; // Return in 'YYYY-MM-DD' format
}

// Function to convert 'HH:MM AM/PM' to 'HH:MM:SS'
function convertTo24HourFormat(timeString) {
    const [time, modifier] = timeString.split(' '); // Split time and modifier (AM/PM)
    let [hours, minutes] = time.split(':'); // Split hours and minutes

    // Convert to number for calculation
    hours = parseInt(hours, 10);
    if (modifier === 'PM' && hours !== 12) {
        hours += 12; // Convert PM to 24-hour format
    } else if (modifier === 'AM' && hours === 12) {
        hours = 0; // Convert 12 AM to 0 hours
    }

    return `${hours.toString().padStart(2, '0')}:${minutes}:00`; // Return in 'HH:MM:SS' format
}

// POST route for user sign-up
router.post('/sign-up', (req, res) => {
    const { name, email, password } = req.body;

    // Validate input data
    if (!name || !email || !password) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    // Check if the user already exists
    const checkUserQuery = 'SELECT * FROM users WHERE email = ?';
    database.query(checkUserQuery, [email], (err, results) => {
        if (err) {
            console.error('Error checking user:', err);
            return res.status(500).json({ error: 'Database query failed.' });
        }

        // If user already exists
        if (results.length > 0) {
            return res.status(400).json({ error: 'User already exists.' });
        }

        // Hash the password before saving
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                console.error('Error hashing password:', err);
                return res.status(500).json({ error: 'Error hashing password.' });
            }

            // Save the new user to the database
            const insertQuery = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
            database.query(insertQuery, [name, email, hash], (err) => {
                if (err) {
                    console.error('Error saving user:', err);
                    return res.status(500).json({ error: 'Error saving user.' });
                }

                console.log('User registered successfully');
                return res.status(201).json({ message: 'User registered successfully!' });
            });
        });
    });
});

// POST route for user login
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Validate input data
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    // Check if the user exists in the database
    const query = 'SELECT * FROM users WHERE email = ?';
    database.query(query, [email], (err, results) => {
        if (err) {
            console.error('Error fetching user:', err);
            return res.status(500).json({ error: 'Database query failed.' });
        }

        // If user not found
        if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }

        const user = results[0];

        // Compare the password with the hashed password in the database
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                console.error('Error comparing passwords:', err);
                return res.status(500).json({ error: 'Password comparison failed.' });
            }

            // If the password matches
            if (isMatch) {
                console.log('User logged in successfully');
                return res.status(200).json({
                    message: 'Login successful!',
                    user: { id: user.id, name: user.name, email: user.email }, // Include user details if needed
                });
            } else {
                return res.status(401).json({ error: 'Invalid email or password.' });
            }
        });
    });
});

// POST route for adding a pet
router.post('/pets', (req, res) => {
    const { name, breed, age, description } = req.body;

    // Validate input data
    if (!name) {
        return res.status(400).json({ error: 'Name is required.' });
    }

    // Insert new pet into the database
    const insertQuery = 'INSERT INTO pets (name, breed, age, description) VALUES (?, ?, ?, ?)';
    database.query(insertQuery, [name, breed, age, description], (err, results) => {
        if (err) {
            console.error('Error saving pet:', err);
            return res.status(500).json({ error: 'Error saving pet.' });
        }

        console.log('Pet added successfully');
        return res.status(201).json({ message: 'Pet added successfully!', petId: results.insertId });
    });
});

// POST route for adding a reservation
router.post('/reservations', (req, res) => {
    console.log('Incoming request for reservations:', req.body); // Log incoming request body
    const { pet_type, service_type, description, reservation_date, reservation_time } = req.body;

    // Validate input data
    if (!pet_type || !service_type || !reservation_date || !reservation_time) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    // Convert the reservation date format
    const formattedDate = formatDateString(reservation_date);
    
    // Convert the reservation time format
    const formattedTime = convertTo24HourFormat(reservation_time);

    // Insert new reservation into the database
    const insertQuery = 'INSERT INTO reservations (pet_type, service_type, description, reservation_date, reservation_time) VALUES (?, ?, ?, ?, ?)';
    database.query(insertQuery, [pet_type, service_type, description, formattedDate, formattedTime], (err, results) => {
        if (err) {
            console.error('Error saving reservation:', err);
            return res.status(500).json({ error: 'Error saving reservation.' });
        }

        console.log('Reservation added successfully');
        return res.status(201).json({ message: 'Reservation added successfully!', reservationId: results.insertId });
    });
});

module.exports = router;
