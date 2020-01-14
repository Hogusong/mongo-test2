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

  it('PUT to /api/driver to update a driver', done => {
    const driver = new Driver({
      name: 'Narae Song',
      email: 'narae.song@gmail.com'
    })
    driver.save().then(() => {
      assert(driver.driving == false);
      request(app)
        .put('/api/drivers/' + driver._id)
        .send({
          email: 'narae.song@yahoo.com',
          driving: true
        })
        .end((err, response) => {
          assert(response.body.email == 'narae.song@yahoo.com');
          assert(response.body.driving == true);
          done();
        })
    })
  });

  it('DELETE to /api/drivers/id edits an existing driver', done => {
    const driver = new Driver({
      name: 'Test Driver', email: 'text@test.com',  driving: false
    })
    driver.save().then(() => {
      request(app)
        .delete(`/api/drivers/${driver._id}`)
        .end((err, response) => {
          Driver.findOne({ email: 'text@test.com' })
            .then(driver => assert(driver === null))

          assert(response.body.deletedCount == 1);
          assert(response.body.email === undefined);
          Driver.countDocuments().then(count =>{
            assert(count === 0)
            done();  
          })
        })
    })
  });

  it("GET to /api/drivers finds drivers near [lng, lat]", done => {
    const seattleDriver = new Driver({
      name: 'Joe Song',
      email: 'seattle@test.com',
      geometry: { coordinates: [-122.475, 47.614] }
    });
    const bostonDriver = new Driver({
      name: 'Randy Song',
      email: 'boston@test.com',
      geometry: { coordinates: [-71.253, 42.791] }
    });

    Promise.all([ seattleDriver.save(), bostonDriver.save() ])
      .then(() => {
        request(app)
          .get('/api/available/drivers?lng=-71&lat=42')
          .end((err, response) => {
            assert(response.body.length == 1);
            assert(response.body[0].email === 'boston@test.com')
            done()
          })
      })
  });
})