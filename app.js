const express = require('express');

const app = express();

// Watch for incoming requests of method GET
// to the route http://localhost:3050/api
app.get('/api', (req, res, next) => {
  res.send({ msg: 'Hi there!' });
})

module.exports = app;