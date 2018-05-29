var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProgramsSchema = new Schema({
  program_type: String,
  program_description: String,
  homebased: Boolean,
  price: Number,
  batch_number: Number,
  phase_number: Number,
  slots: Number,
  schedule: Array,
});
//schedule is array because it can be multiple schedules
//one schedule is in this format: date:morning schedule(format: hours-duration):afternoon schedule(format: hours-duration):
//sample: 1516464000000:8.5-2:0-0, this milliseconds equate to jan 1 21,2018, morning schedule is 8:30 am, duration is 2 hours, afternoon schedule is no schedule

var Programs = mongoose.model('program', ProgramsSchema);
module.exports = Programs;



