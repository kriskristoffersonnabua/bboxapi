var express = require('express');
var config  = require('./config/config');
var app     = express();

//connect database here
require('mongoose').connect(config.db.url);

//app middleware
require('./middleware/appMiddleware')(app);

//add routes at api directory: index.js
//auth routes at auth directory
app.use('/api', require('./api/index'));
app.use('/auth', require('./auth/index'));

//application level middleware to catch error, 
//for better error handling modify /middlware/error.js
app.use(require('./middleware/error')());

app.listen(config.port);
