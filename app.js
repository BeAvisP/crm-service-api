require('dotenv').config();
const express = require('express');
const path = require('path');

//DB Configuration
require('./configs/db.config');

const app = express();

// Middleware Setup
require('./configs/middleware.config')(app);
require('./configs/cors.config')(app);
require('./configs/session.config')(app);
require('./configs/passport.config')(app);

// Routes
const authRoutes = require('./routes/authRoutes');
const customerRoutes = require('./routes/customerRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);

// Catch 404 and respond with error message
app.use((req, res, next) => res.status(404).json({ message: 'Not found' }));

module.exports = app;
