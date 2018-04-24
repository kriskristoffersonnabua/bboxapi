const mongoose = require('mongoose');
const Payment = require('./paymentModel');
const _ = require('lodash');

exports.param = function(req, res, next, id){
  Payment
    .findById(id)
    .populate('appointment client')
    .exec()
    .then(function(payment){
      if(!payment){
        next("No payment found");
      }
      else {
        req.payment = payment;
        next();
      }
    })
    .catch(function(err){
      next(err);
    });
}

exports.get = function(req, res, next){
  Payment
    .find({})
    .then(function(payment){
      res.json(payment);
    })
}

exports.getOne = function(req, res, next){
  res.json(req.payment);
}

exports.put = function(req, res, next){
  let payment = req.payment;
  let updatedData = req.body;
  _.merge(payment, updatedData);
  payment.save(function(error, saved){
    if(error){
      next(error);
    }
    else res.json(saved);
  });
}

exports.post = function(req, res, next){
  var newPayment = req.body;
  Payment.create(newPayment)
    .then(function(program){
      res.json(program)
    })
}

exports.delete = function(req, res, next){
  req.payment.remove(function(error, removed){
    if(error){
      next(error);
    }
    else{
      res.json(removed);
    }
  })
}
