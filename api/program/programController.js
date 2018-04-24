var Programs = require('./program');
var _ = require('lodash');

exports.param = function(req, res, next, id){
  Programs.findById(id)
    .then(function(program){
      if(!program){
        next("No program found");
      }
      else {
        req.program = program;
        next();
      }
    })
}

exports.get = function(req, res, next){
  Programs.find({})
    .then(function(programs){
      res.json(programs);
    })
}

exports.getOne = function(req, res, next){
  res.json(req.program);
}

exports.put = function(req, res, next){
  let program = req.program;
  let updatedData = req.body;
  program = _.merge(program, updatedData);
  program.save(function(error, saved){
    if(error){
      next(error);
    }
    else res.json(saved);
  });
}

exports.post = function(req, res, next){
  var newProgram = req.body;
  Programs.create(newProgram)
    .then(function(program){
      res.json(program)
    })
}

exports.delete = function(req, res, next){
  req.program.remove(function(error, removed){
    if(error){
      next(error);
    }
    else{
      res.json(removed);
    }
  })
}
