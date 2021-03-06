const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LPRSchema = new Schema({
  date: Date,
  //array of string of subjects
  subject: Array,
  time_start: Number,
  time_end: Number,
  duration: Number,
  remarks: String,
  appointment: {
    type: Schema.Types.ObjectId,
    ref: 'appointment',
  },
  tutor: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  tutorPaymentBalance: Number,
  isTutorPaymentClaimed: Boolean,
  isGroupTutorial: Boolean,
  reportSubmitted: {
    type: Boolean,
    defaulValue: false,
  },
});

module.exports = mongoose.model('lpr', LPRSchema);
