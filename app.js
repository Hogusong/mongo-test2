const express = require('express');
const driverRoute = require('./routes/driver');

const app = express();

driverRoute(app);

module.exports = app;