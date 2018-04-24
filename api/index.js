var apiRoute = require('express').Router();

//insert resource routes here
//i.e. apiRoute.use('/programs', require('./programs/index'))
apiRoute.use('/user', require('./user/userRoutes'))
apiRoute.use('/program', require('./program/programRoutes'));
apiRoute.use('/appointment', require('./appointment/appointmentRoutes'));
apiRoute.use('/payment', require('./payment/paymentRoutes'));
apiRoute.use('/tutorPayment', require('./tutorPayment/tutorPaymentRoutes'));
apiRoute.use('/feedback', require('./feedback/feedbackRoutes'));

//general route for the api: /api
apiRoute.route('/')
  .get(function(req, res){
    res.setHeader('Content-Type', 'text/html');
    res.send('<h1>Welcome To Api</h1>')
  });

module.exports = apiRoute;
