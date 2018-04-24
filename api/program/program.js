var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProgramsSchema = new Schema({
  program_type: String,
  homebased: Boolean,
  price: Number,
  batch_number: Number,
  slots: Number,
  schedule: String,
  start_date: Date,
  end_date: Date,
});

var Programs = mongoose.model('program', ProgramsSchema);
module.exports = Programs;



