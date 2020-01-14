const mongoose = require('mongoose');

before( done => {
  mongoose.connect('mongodb://localhost/driver_test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  mongoose.connection
    .once('open', () => done())
    .on('error', err=> console.warn('Warning', error));
});

beforeEach(done => {
  const { drivers } = mongoose.connection.collections;
  if (drivers) {
    drivers.drop()
      .then(() => drivers.createIndex({ 'geometry.coordinates': '2dsphere' }))
      .then(() => done())
      .catch(() => done())
  } else done();
});

