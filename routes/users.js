const express = require('express');
const userRouter = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Test = require('../models/test');
const Config = require('../config/database');

// Register
userRouter.post('/register', (req, res) => {
  let newUser = new User({
    name: {
      first: req.body.name.firstName,
      last: req.body.name.lastName,
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

  User.getUserByUsername(newUser.username, (error, user) => {
    if (error) throw error;

    if (user) {
      res.json({
        success: false,
        message: 'User with same username already exist!',
      });
      return;
    }

    User.getUserByEmail(newUser.email, (error, user) => {
      if (error) throw error;

      if (user) {
        res.json({
          success: false,
          message: 'User with same email already exist!',
        });
        return;
      }

      User.addUser(newUser, (error, user) => {
        if (error) {
          res.json({ success: false, message: 'Registration failed!' });
        } else {
          res.json({ success: true, message: 'User registered!' });
        }
      });
    });
  });
});

// Authenticate
userRouter.post('/authenticate', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (error, user) => {
    if (error) throw error;

    if (!user) {
      return res.json({ success: false, message: 'User not found!' });
    }

    User.comparePassword(password, user.password, (error, isMatch) => {
      if (error) throw error;
      if (isMatch) {
        const token = jwt.sign(
          {
            id: user._id,
            name: { ...user.name },
            email: user.email,
            username: user.username,
            gender: user.gender,
            userType: user.Type,
            lastSeen: user.lastSeen,
            testId: [...user.testId],
            status: { ...user.status },
          },
          Config.secret,
          { expiresIn: 3600 } // 1 MONTH
        );

        res.json({
          success: true,
          token: 'Bearer ' + token,
        });
      } else {
        res.json({ success: false, message: 'Wrong password!' });
      }
    });
  });
});

// Profile
userRouter.get('/profile/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    userId = req.params.id;
    Test.updateTestResults(userId);
    Test.getAllTestByUserId(userId, (error, tests) => {
      if (error) throw error;

      if (!tests) {
        res.json({
          success: false,
          message: 'There are no tests for requested user!',
        });
      } else {
        res.json({ success: true, tests: [...tests] });
      }
    });
  }
);

module.exports = userRouter;
