module.exports = {
  greeting(req, res, next) {
    res.send({ msg: 'Hi there!' });
  },

  create(req, res, next) {
    const driverProps = req.body;
    console.log(driverProps);
    res.send({ msg: 'All info received well.'})
  }
}