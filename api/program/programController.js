var Programs = require('./program');
var _ = require('lodash');

exports.param = function(req, res, next, id) {
  Programs.findById(id).then(function(program) {
    if (!program) {
      next('No program found');
    } else {
      req.program = program;
      next();
    }
  });
};

exports.get = function(req, res, next) {
  let type = undefined;
  if (req.query && req.query.hasOwnProperty('type')) {
    switch (parseInt(req.query.type)) {
      //one on one tutorial
      case 0:
        type = 0;
        break;
      //csc review programs
      case 1:
        type = 1;
        break;
      //pshs review programs
      case 2:
        type = 2;
        break;
      //cee review programs
      case 3:
        type = 3;
        break;
      default:
        break;
    }
  }
  if (type === undefined) {
    Programs.find({}).then(function(programs) {
      res.json(programs);
    });
  } else {
    Programs.find({programType: type}).then(function(programs) {
      res.json(programs);
    });
  }
};

exports.getOne = function(req, res, next) {
  res.json(req.program);
};

exports.put = function(req, res, next) {
  let program = req.program;
  let updatedData = req.body;
  program = _.merge(program, updatedData);
  program.save(function(error, saved) {
    if (error) {
      next(error);
    } else res.json(saved);
  });
};

exports.post = function(req, res, next) {
  var newProgram = req.body;
  Programs.create(newProgram).then(function(program) {
    res.json(program);
  });
};

exports.delete = function(req, res, next) {
  req.program.remove(function(error, removed) {
    if (error) {
      next(error);
    } else {
      res.json(removed);
    }
  });
};
