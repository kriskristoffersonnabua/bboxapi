// const Appointment = require('../api/appointment/appointmentModel');
const Programs = require('../api/program/program');
// const BookedSchedules = require('../api/bookedSchedule/bookedScheduleModel');
// const LPR = require('../api/lpr/lprModel');
const _ = require('lodash');

const programs = [
  {
    programType: 0,
    programDescription:
      'One on one tutorial focus on the development of any tutee on close proximity for better learning and absorption of knowledge for the future.',
  },
  {
    programType: 1,
    programDescription:
      'Civil Service Exam Review offers a variety of teaching that would make your learnings better for greater results for upcoming test. Book now for available slots.',
    batchNumber: 2,
    slots: 35,
    schedule: ['1528688873124:8.5-2:0-0', '1629688873124:8.5-2:2-2'],
    price: 2500,
  },
  {
    programType: 1,
    programDescription:
      'Civil Service Exam Review offers a variety of teaching that would make your learnings better for greater results for upcoming test. Book now for available slots.',
    batchNumber: 2,
    slots: 35,
    schedule: ['1528688873124:8.5-2:0-0'],
    price: 2500,
  },
  {
    programType: 2,
    programDescription:
      'PSHS Review offers a variety of teaching that would make your learnings better for greater results for upcoming test. Book now for available slots.',
    batchNumber: 2,
    slots: 35,
    schedule: ['1528688873124:8.5-2:0-0'],
    price: 2500,
  },
  {
    programType: 3,
    programDescription:
      'College Entrance Exam Review offers a variety of teaching that would make your learnings better for greater results for upcoming test. Book now for available slots.',
    batchNumber: 2,
    slots: 35,
    schedule: ['1528688873124:8.5-2:0-0'],
    price: 2500,
  },
  {
    programType: 3,
    programDescription:
      'College Entrance Exam Review offers a variety of teaching that would make your learnings better for greater results for upcoming test. Book now for available slots.',
    batchNumber: 2,
    slots: 35,
    schedule: ['1528688873124:8.5-2:0-0'],
    price: 2500,
  },
];

var createDoc = function(model, doc) {
  return new Promise(function(resolve, reject) {
    new model(doc).save(function(err, saved) {
      return err ? reject(err) : resolve(saved);
    });
  });
};

var cleanDB = function() {
  var cleanPromises = [
    Programs,
    /* Programs, BookedSchedules, LPR, Appointment */
  ].map(function(model) {
    return model.remove().exec();
  });
  return Promise.all(cleanPromises);
};

var createPrograms = function() {
  var promises = programs.map(function(program) {
    return createDoc(Programs, program);
  });
  return Promise.all(promises).then(function(programs) {
    return _.merge({programs: programs}, {});
  });
};

cleanDB().then(createPrograms);
