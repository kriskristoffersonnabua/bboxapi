const Appointments = require('./appointmentModel');
const _ = require('lodash');

exports.param = function(req, res, next, id) {
  Appointments.findById(id)
    .populate('tutorId program bookedSchedules progressReport')
    .exec()
    .then(function(appointment) {
      if (!appointment) {
        next('No appointment found');
      } else {
        req.appointment = appointment;
        next();
      }
    });
};

exports.get = function(req, res, next) {
  try {
    if (req.query && req.query.hasOwnProperty('cid')) {
      Appointments.find({clientId: req.query.cid})
        .populate('tutorId program bookedSchedules progressReport')
        .then(function(appointment) {
          res.json(appointment);
        });
    } else if (req.query && req.query.hasOwnProperty('tid')) {
      Appointments.find({tutorId: req.query.tid})
        .populate('tutorId program bookedSchedules progressReport')
        .then(function(appointment) {
          res.json(appointment);
        });
    } else if (req.query && req.query.hasOwnProperty('admin')) {
      Appointments.find({})
        .populate('tutorId program bookedSchedules progressReport')
        .then(function(appointment) {
          res.json(appointment);
        });
    } else {
      Appointments.find({})
        .populate('tutorId program bookedSchedules progressReport')
        .then(function(appointment) {
          res.json(appointment);
        });
    }
  } catch (exception) {
    next(exception);
  }
};

exports.getOne = function(req, res, next) {
  try {
    res.json(req.appointment);
  } catch (exception) {
    next(exception);
  }
};

exports.put = function(req, res, next) {
  let appointment = req.appointment;
  let updatedData = req.body;
  _.merge(appointment, updatedData);
  if (updatedData.hasOwnProperty('bookedSchedules')) {
    appointment.markModified('bookedSchedules');
  }
  if (updatedData.hasOwnProperty('progressReport')) {
    appointment.markModified('progressReport');
  }
  if (updatedData.hasOwnProperty('feedback')) {
    appointment.markModified('feedback');
  }
  if (updatedData.hasOwnProperty('subjects')) {
    appointment.markModified('subjects');
  }
  appointment.save(function(error, saved) {
    if (error) {
      next(error);
    } else res.json(saved);
  });
};

exports.post = function(req, res, next) {
  var newAppointment = req.body;
  Appointments.create(newAppointment).then(function(error, program) {
    if (!error) {
      res.json(program);
    } else next(error);
  });
};

exports.delete = function(req, res, next) {
  req.appointment.remove(function(error, removed) {
    if (error) {
      next(error);
    } else {
      res.json(removed);
    }
  });
};
