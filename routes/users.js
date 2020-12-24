const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Config = require('../config/database');

// Register
router.post('/register', (req, res) => {
  let newUser = new User({
    name: {
      first: req.body.firstName,
      last: req.body.lastName,
    },
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    gender: req.body.gender,
    userType: req.body.userType ? req.body.userType : 'standard',
    lastSeen: null,
    testId: [],
    status: {
      status: 'healty',
      dateFrom: null,
      dateTo: null,
      dateDateOfLastSelfTest: null,
    },
  });

  User.addUser(newUser, (error, user) => {
    if (error) {
      res.json({ success: false, message: 'Registration failed!' });
    } else {
      res.json({ success: true, message: 'User registered!' });
    }
  });
});

// Authenticate
router.post('/authenticate', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (error, user) => {
    if (error) throw error;

    if (!user) {
      return res.json({ success: false, message: 'User not founf!' });
    }

    User.comparePassword(password, user.password, (error, isMatch) => {
      if (error) throw error;
      if (isMatch) {
        const token = jwt.sign(
          { user },
          Config.secret,
          { expiresIn: '1h' } // 1 week
        );

        res.json({
          success: true,
          token: 'JWT ' + token,
          user: {
            id: user._id,
            name: { ...user.name },
            email: user.email,
            gender: user.gender,
            userType: user.Type,
            lastSeen: user.lastSeen,
            testId: [...user.testId],
            status: { ...user.status },
          },
        });
      } else {
        res.json({ success: false, message: 'Wrong password!' });
      }
    });
  });
});

// Profile
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.send({user:req.user});
});

module.exports = router;
