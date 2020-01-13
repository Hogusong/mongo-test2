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
  }
}