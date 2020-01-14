const Driver = require('../models/driver');

module.exports = {
  greeting(req, res, next) {
    res.send({ msg: 'Hi there!' });
  },

  create(req, res, next) {
    const driverProps = req.body;
    // console.log('new driver:', driverProps);
    // const driver = new Driver(driverProps);
    // driver.save()
    //   .then(result => { 
    //     console.log('driver:', result)
    //     res.send(result)
    //   });
    Driver.create(driverProps)
      .then(driver => res.send(driver))
      .catch(next);
  },

  edit(req, res, next) {
    const driverId = req.params.id;
    const driverProps = req.body;
    Driver.updateOne({ _id: driverId }, driverProps)
      .then(() => Driver.findById({ _id: driverId }))
      .then(driver => {
        res.send(driver)})
      .catch(next)
  },

  findDrivers(req, res) {
    Driver.find({})
      .then(drivers => {
        res.send(drivers)
      });
  },

  findDriver(req, res) {
    if (req.query.email) {
      Driver.findOne({ email: req.query.email })
      .then(driver => {
        res.send(driver);
      })
    } else {
      Driver.findOne({ name: req.query.name })
      .then(driver => {
        res.send(driver);
      })
    }
  },

  delete(req, res, next) {
    const driverId = req.params.id;
    Driver.deleteOne({ _id: driverId })
      .then(result => {
        res.send(result);
      })
      .catch(next);
  },

  index(req, res, next) {
    // req.uri = 'http://google.com?lng=80&lat=12'  
    // req.query = { lng: 80, lat: 12 }
    
    const lng = parseFloat(req.query.lng);
    const lat = parseFloat(req.query.lat);

    Driver.aggregate([{
      '$geoNear': {
            'near': { 'type': 'Point',  'coordinates': [lng, lat] }, 
            'spherical': true,  
            'distanceField': 'dist',
            'maxDistance': 200000
        }
    }])
      .then(drivers => {
        res.send(drivers);
      })
      .catch(next)
  }
}