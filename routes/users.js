const express = require('express');
const router = express.Router();

// Register
router.post('/register', (req, res) => {
    res.send('REGISTER');
});

// Authenticate
router.post('/authenticate', (req, res) => {
    res.send('AUTHENTICATE');
});

// Profile
router.get('/profile', (req, res) => {
    res.send('PROFILE');
});

module.exports = router;