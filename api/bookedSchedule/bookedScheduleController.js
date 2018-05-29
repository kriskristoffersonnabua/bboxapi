const mongoose = require('mongoose');
const BookedSchedules = require('./bookedScheduleModel');
const _ = require('lodash');

exports.param = function(req, res, next, id){
  BookedSchedules
    .findById(id)
    .populate('appointment tutor')
    .then(function(bookedschedule){
      if(!bookedschedule){
        next("No booked schedule found.");
      }
      else {
        req.bookedschedule = bookedschedule;
        next();
      }
    })
    .catch(function(err){
      next(err);
    });
}

exports.get = function(req, res, next){
  BookedSchedules
    .find({})
    .then(function(bookedschedule){
      res.json(bookedschedule);
    })
}

exports.getOne = function(req, res, next){
  res.json(req.bookedschedule);
}

exports.put = function(req, res, next){
  let bookedschedule = req.bookedschedule;
  let updatedData = req.body;
  _.merge(bookedschedule, updatedData);
  bookedschedule.save(function(error, saved){
    if(error){
      next(error);
    }
    else res.json(saved);
  });
}

exports.post = function(req, res, next){
  var newFeedback = req.body;
  BookedSchedules.create(newFeedback)
    .then(function(program){
      res.json(program)
    })
}

exports.delete = function(req, res, next){
  req.bookedschedule.remove(function(error, removed){
    if(error){
      next(error);
    }
    else{
      res.json(removed);
    }
  })
}
