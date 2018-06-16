const mongoose = require('mongoose');
const BookedSchedules = require('./bookedScheduleModel');
const _ = require('lodash');

exports.param = function(req, res, next, id) {
  BookedSchedules.findById(id)
    .populate('appointment tutor')
    .then(function(bookedschedule) {
      if (!bookedschedule) {
        next('No booked schedule found.');
      } else {
        req.bookedschedule = bookedschedule;
        next();
      }
    })
    .catch(function(err) {
      next(err);
    });
};

exports.search = function(req, res, next) {
  if (req.query && req.query.hasOwnProperty('date')) {
    const dateLowerBoundary = new Date(req.query.date);
    const dateUpperBoundary = new Date(req.query.date);
    dateUpperBoundary.setDate(dateUpperBoundary.getDate() + 1);
    BookedSchedules.find({
      date: {
        $gte: new ISODate(dateLowerBoundary.toISOString()),
        $lt: new ISODate(dateUpperBoundary.toISOString()),
      },
    })
      .populate('tutor')
      .then(bookedSchedules => {
        if (bookedSchedules != undefined && bookedSchedules.length > 0) {
          res.json(bookedSchedules);
        }
      })
      .catch(error => next(error));
  }
};

exports.get = function(req, res, next) {
  BookedSchedules.find({}).then(function(bookedschedule) {
    res.json(bookedschedule);
  });
};

exports.getOne = function(req, res, next) {
  res.json(req.bookedschedule);
};

exports.put = function(req, res, next) {
  let bookedschedule = req.bookedschedule;
  let updatedData = req.body;
  _.merge(bookedschedule, updatedData);
  bookedschedule.save(function(error, saved) {
    if (error) {
      next(error);
    } else res.json(saved);
  });
};

exports.post = function(req, res, next) {
  var newFeedback = req.body;
  BookedSchedules.create(newFeedback).then(function(program) {
    res.json(program);
  });
};

exports.delete = function(req, res, next) {
  req.bookedschedule.remove(function(error, removed) {
    if (error) {
      next(error);
    } else {
      res.json(removed);
    }
  });
};
