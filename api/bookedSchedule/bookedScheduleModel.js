const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookedScheduleSchema = new Schema({
  date: Date,
  tutor: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  time_start: String,
  time_end: String,
  duration: Number,
  status: String,
  appointment: {
    type: Schema.Types.ObjectId,
    ref: 'appointment'
  }
});

module.exports = mongoose.model('bookedschedule', BookedScheduleSchema)
