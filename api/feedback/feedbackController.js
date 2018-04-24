const mongoose = require('mongoose');
const Feedbacks = require('./feedbackModel');
const _ = require('lodash');

exports.param = function(req, res, next, id){
  Feedbacks
    .findById(id)
    .populate('appointment tutor')
    .then(function(feedback){
      if(!feedback){
        next("No feedback found.");
      }
      else {
        req.feedback = feedback;
        next();
      }
    })
    .catch(function(err){
      next(err);
    });
}

exports.get = function(req, res, next){
  Feedbacks
    .find({})
    .then(function(feedback){
      res.json(feedback);
    })
}

exports.getOne = function(req, res, next){
  res.json(req.feedback);
}

exports.put = function(req, res, next){
  let feedback = req.feedback;
  let updatedData = req.body;
  _.merge(feedback, updatedData);
  feedback.save(function(error, saved){
    if(error){
      next(error);
    }
    else res.json(saved);
  });
}

exports.post = function(req, res, next){
  var newFeedback = req.body;
  Feedbacks.create(newFeedback)
    .then(function(program){
      res.json(program)
    })
}

exports.delete = function(req, res, next){
  req.feedback.remove(function(error, removed){
    if(error){
      next(error);
    }
    else{
      res.json(removed);
    }
  })
}
