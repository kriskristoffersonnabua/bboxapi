const User = require('./user');
const _ = require('lodash');

exports.param = function(req, res, next, id){
  User.findById(id)
    .then(function(user){
      console.log("heheheh")
      console.log(user);
      if(!user) {
        next("No user found with that id.");
      }
      else {
        req.user = user
        next();
      }
    })
}

exports.get = function(req, res, next){
  User.find({})
    .then(function(users){
      return res.json(users);
    }, function(error){
      next(error);
    })
}

exports.getOne = function(req, res, next){
  res.json(req.user);
}

exports.post = function(req, res, next){
  const newUser = new User(req.body);
  newUser.save(function(err, user){
    if(err) next(err);
    res.json(user);
    //TODO: auth token object response
  })
}

exports.put = function(req, res, next){
  const user = req.user;
  const data = req.body;

  _.merge(user, data);
  user.save(function(err, user){
    if(err) next(err);
    res.json(user);
  })
}

exports.delete = function(req, res, next){
  req.user.remove(function(err, removedUser){
    if(err){
      next(err);
    }
    else {
      res.json(removedUser);
    }
  })
}