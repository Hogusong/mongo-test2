const assert = require('assert');
const request = require('supertest');
const app = require('../app');
const Driver = require('../models/driver');

describe('The Drivers controller', () => {
  it('POST to /api/driver to create a new driver', (done) => {
    Driver.countDocuments().then( count => {
      request(app)
        .post('/api/driver')
        .send({ 
          name: 'Narae Song',
          email: 'narae@gmail.com'
        })
        .end((err, response) => {
          assert(response.body.email === 'narae@gmail.com');
          assert(response.body.name === 'Narae Song');
          Driver.countDocuments().then( newCount => {
            assert(newCount === count + 1);
          })
          Driver.find({})
            .then(drivers => {
              assert(drivers[0].email === 'narae@gmail.com')
              done();
            })
        })
    })
  });
})