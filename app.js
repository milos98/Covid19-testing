const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// Mongo Atlas BD connection
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(config.database);

// On Connect
mongoose.connection.on('connected', () => {
  console.log('Connected to DB');
});

// On error
mongoose.connection.on('error', (error) => {
  console.log('Error connecting to DB: ' + error);
});

const app = express();

const users = require('./routes/users');
const tests = require('./routes/tests');

// PORT number
const port = 3000;

// CORS Middleware
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Bodyparser Middleware
app.use(bodyparser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Passport config
require('./config/passport')(passport);

app.use('/users', users);
app.use('/tests', tests);

// Index route
app.get('/', (req, res) => {
  res.send('Invalid endpoint');
});

// Sart server
app.listen(port, () => {
  console.log('Server started on port ' + port);
});
