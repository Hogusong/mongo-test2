module.exports = {
  greeting(req, res, next) {
    res.send({ msg: 'Hi there!' });
  }
}