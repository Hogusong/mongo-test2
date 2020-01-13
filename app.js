const express = require('express');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const driverRoute = require('./routes/driver');

const app = express();
mongoose.Promise = global.Promise;

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect('mongodb://localhost/muber');
}

app.use(bodyParser.json());
app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
})

driverRoute(app);

module.exports = app;