const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
  program: {
    type: Schema.Types.ObjectId,
    ref: 'program'
  },
  tutor_id: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  tutees: Array,
  client_id: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  address: String,
  schedule: Array,
  start_date: String,
  end_date: String,
  progress_report: {
    type: Schema.Types.ObjectId,
    ref: 'progressreport'
  },
  feedback: {
    type: Schema.Types.ObjectId,
    ref: 'feedback'
  },
});

module.exports = mongoose.model('appointment', AppointmentSchema);
