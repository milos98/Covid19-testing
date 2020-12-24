const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Register
router.post('/register', (req, res) => {
    let newUser = new User({
        name: {
            first: req.body.firstName,
            last: req.body.lastName
        },
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        gender: req.body.gender,
        userType: (req.body.userType) ? req.body.userType : "standard",
        lastSeen: null,
        testId: [],
        status: {
            status: "healty",
            dateFrom: null,
            dateTo: null,
            dateDateOfLastSelfTest: null
        }
    });

    User.addUser(newUser, (error, user) => {
        if(error){
            res.json({success: false, message: "Registration failed!"})
        } else {
            res.json({success: true, message: "User registered!"})
        }
    })
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