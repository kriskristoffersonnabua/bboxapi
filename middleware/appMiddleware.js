// import application level middleware here
var bodyParser = require('body-parser');
var morgan     = require('morgan');

module.exports = function(app) {
  // client request logger
  app.use(morgan('dev'));

  // body parser makes it possible to post JSON to the server
  // we can access data we post on as req.body
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
};
