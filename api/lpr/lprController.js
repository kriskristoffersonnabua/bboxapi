const mongoose = require('mongoose');
const LPR = require('./lprModel');
const _ = require('lodash');

exports.param = function(req, res, next, id) {
  LPR.findById(id)
    .populate('appointment tutor')
    .exec()
    .then(function(lpr) {
      if (!lpr) {
        next('No lpr found');
      } else {
        req.lpr = lpr;
        next();
      }
    })
    .catch(function(err) {
      next(err);
    });
};

exports.get = function(req, res, next) {
  LPR.find({}).then(function(lpr) {
    res.json(lpr);
  });
};

exports.getOne = function(req, res, next) {
  res.json(req.lpr);
};

exports.put = function(req, res, next) {
  let lpr = req.lpr;
  let updatedData = req.body;
  _.merge(lpr, updatedData);
  lpr.save(function(error, saved) {
    if (error) {
      next(error);
    } else res.json(saved);
  });
};

exports.post = function(req, res, next) {
  var newLPR = req.body;
  LPR.create(newLPR).then(function(program) {
    res.json(program);
  });
};

exports.delete = function(req, res, next) {
  req.lpr.remove(function(error, removed) {
    if (error) {
      next(error);
    } else {
      res.json(removed);
    }
  });
};
