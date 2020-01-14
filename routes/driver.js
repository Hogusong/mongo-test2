const driverCtrl = require('../controllers/driver_ctrl');

module.exports = (app) => {
  // Watch for incoming requests of method GET
  // to the route http://localhost:3050/api
  app.get('/api', driverCtrl.greeting);

  app.get('/api/drivers', driverCtrl.findDrivers);

  app.get('/api/driver', driverCtrl.findDriver);

  app.post('/api/driver', driverCtrl.create);

  app.put('/api/drivers/:id', driverCtrl.edit);

  app.delete('/api/drivers/:id', driverCtrl.delete);

  app.get('/api/available/drivers', driverCtrl.index);
}