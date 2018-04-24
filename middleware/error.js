module.exports = function() {
  return function(err, req, res, next) {
    res.status(500).send('Server Error: Bad request:' + err.message);
  }
}
