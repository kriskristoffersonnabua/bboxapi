const User = require('./user');
const _ = require('lodash');
const signToken = require('../../auth/auth').signToken;

exports.param = function(req, res, next, id) {
  User.findById(id).then(function(user) {
    if (!user) {
      next('No user found with that id.');
    } else {
      req.userFetchById = user;
      next();
    }
  });
};

exports.me = function(req, res, next) {
  return res.json(req.user);
};

exports.getTutors = function(req, res, next) {
  User.find({accountType: 1})
    .select('-password')
    .then(
      function(users) {
        return res.json(users);
      },
      function(error) {
        next(error);
      },
    );
};

exports.get = function(req, res, next) {
  User.find({})
    .select('-password')
    .then(
      function(users) {
        return res.json(users);
      },
      function(error) {
        next(error);
      },
    );
};

exports.getOne = function(req, res, next) {
  res.json(req.userFetchById);
};

exports.post = (req, res, next) => {
  const newUser = new User(req.body);
  newUser.save(function(err, user) {
    if (user != undefined) {
      var token = signToken(user._id);
      res.json({token: token, id: user._id});
    } else if (err) {
      next(err);
    }
  });
};

exports.put = function(req, res, next) {
  const data = req.body;
  const userFetchById = req.userFetchById;

  let subjects = req.body.subjects;
  let schedule = req.body.schedule;
  delete data['subjects'];
  delete data['schedule'];
  _.merge(userFetchById, data);

  userFetchById['schedule'] = schedule;
  userFetchById['subjects'] = subjects;

  userFetchById.save(function(err, user) {
    if (err) next(err);
    res.json(user);
  });
};

exports.delete = function(req, res, next) {
  req.userFetchById.remove(function(err, removedUser) {
    if (err) {
      next(err);
    } else {
      res.json(removedUser);
    }
  });
};

exports.search = function(req, res, next) {
  if (req.query && req.query.hasOwnProperty('search')) {
    User.find({$text: {$search: req.query.search}})
      .select('-password')
      .then(
        function(users) {
          return res.json(users);
        },
        function(error) {
          next(error);
        },
      );
  }
};
