const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

const app = express();

const users = require('./routes/users');

// PORT number
const port = 3000;

// CORS Middleware
app.use(cors());

// Bodyparser Middleware
app.use(bodyparser.json());

app.use('/users', users);

// Index route
app.get('/', (req,res) =>{
    res.send('Invalid endpoint');
});

// Sart server
app.listen(port, () =>{
    console.log('Server started on port ' +port);
});
