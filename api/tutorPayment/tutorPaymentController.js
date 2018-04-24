const mongoose = require('mongoose');
const TutorPayment = require('./tutorPaymentModel');
const _ = require('lodash');

exports.param = function(req, res, next, id){
  TutorPayment
    .findById(id)
    .populate('appointment tutor')
    .exec()
    .then(function(tutorpayment){
      if(!tutorpayment){
        next("No tutor tutorpayment found");
      }
      else {
        req.tutorpayment = tutorpayment;
        next();
      }
    })
    .catch(function(err){
      next(err);
    });
}

exports.get = function(req, res, next){
  TutorPayment
    .find({})
    .then(function(tutorpayment){
      res.json(tutorpayment);
    })
}

exports.getOne = function(req, res, next){
  res.json(req.tutorpayment);
}

exports.put = function(req, res, next){
  let tutorpayment = req.tutorpayment;
  let updatedData = req.body;
  _.merge(tutorpayment, updatedData);
  tutorpayment.save(function(error, saved){
    if(error){
      next(error);
    }
    else res.json(saved);
  });
}

exports.post = function(req, res, next){
  var newTutorPayment = req.body;
  TutorPayment.create(newTutorPayment)
    .then(function(program){
      res.json(program)
    })
}

exports.delete = function(req, res, next){
  req.tutorpayment.remove(function(error, removed){
    if(error){
      next(error);
    }
    else{
      res.json(removed);
    }
  })
}
