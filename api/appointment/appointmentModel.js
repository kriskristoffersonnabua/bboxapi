const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
  program: {
    type: Schema.Types.ObjectId,
    ref: 'program',
  },
  tutorId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  tutees: Array,
  clientId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  subjects: [String],
  address: {
    type: String,
    get: function(data) {
      return JSON.parse(data);
    },
    set: function(data) {
      return JSON.stringify(data);
    },
  },
  schedule: Array,
  startDate: String,
  endDate: String,
  bookedSchedules: [
    {
      type: Schema.Types.ObjectId,
      ref: 'bookedschedule',
    },
  ],
  progressReport: [
    {
      type: Schema.Types.ObjectId,
      ref: 'lpr',
    },
  ],
  feedback: [
    {
      type: Schema.Types.ObjectId,
      ref: 'feedback',
    },
  ],
});

module.exports = mongoose.model('appointment', AppointmentSchema);
