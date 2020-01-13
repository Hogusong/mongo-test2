const express = require('express');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const driverRoute = require('./routes/driver');

const app = express();
mongoose.Promise = global.Promise;

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect('mongodb://localhost/muber');
}

// run middleware befor routes handle
app.use(bodyParser.json());

driverRoute(app);

// run middleware after routes handle
app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(422).send({ error: err.message });
})

module.exports = app;