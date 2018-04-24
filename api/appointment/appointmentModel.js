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
  tutee_id: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  location: String,
  tutorial_duration: Number,
  // stringify data
  progress_report: String
});

module.exports = mongoose.model('appointment', AppointmentSchema);
