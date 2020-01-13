const driverCtrl = require('../controllers/driver_ctrl');

module.exports = (app) => {
  // Watch for incoming requests of method GET
  // to the route http://localhost:3050/api
  app.get('/api', driverCtrl.greeting);
}