const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const UserSchema = mongoose.Schema({
  name: {
    first: {
      type: String,
      required: true,
    },
    last: {
      type: String,
      required: true,
    },
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    required: true,
  },
  lastSeen: Date,
  testId: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Tests',
    },
  ],
  status: {
    status: String,
    dateFrom: Date,
    dateTo: Date,
    dateDateOfLastSelfTest: Date,
  },
});

const User = (module.exports = mongoose.model('User', UserSchema));

module.exports.getUserById = function (id, callback) {
  User.findById(id, callback);
};

module.exports.getUserByUsername = function (username, callback) {
  const query = { username: username };
  User.findOne(query, callback);
};

module.exports.addUser = function (newUser, callback) {
  bcrypt.genSalt(10, (error, salt) => {
    bcrypt.hash(newUser.password, salt, (error, hash) => {
      if (error) throw error;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};

module.exports.comparePassword = function (inputPassword, hash, callback) {
  bcrypt.compare(inputPassword, hash, (error, isMatch) => {
    if (error) throw error;
    callback(null, isMatch);
  });
};
