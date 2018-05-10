var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  firstname: String,
  middlename: String,
  lastname: String,
  birthday: Date,
  contact: Number,
  home_address: String,
  home_phonenumber: Number,
  work_address: String,
  work_phonenumber: Number,
  sex: String,
  birthplace: String,
  photo: String,
  email: String,
  password: String,
  account_type: Number,
  /*client needed information*/
  tutee_firstname: String,
  tutee_middlename: String,
  tutee_lastname: String,
  tutee_birthday: Date,
  /*client end*/
  /* tutor needed information */
  tutor_subjects: Array,
  tutor_schedule: Array,
  tutor_rating: Number,
  tutor_primary_education: String,
  tutor_secondary_education: String,
  tutor_tertiary_education: String,
  tutor_other_education: String
  /* tutor */
})

UserSchema.methods = {
  // check the passwords on signin
  authenticate: function(plainTextPword) {
    return bcrypt.compareSync(plainTextPword, this.password);
  },
  // hash the passwords
  encryptPassword: function(plainTextPword) {
    if (!plainTextPword) {
      return ''
    } else {
      var salt = bcrypt.genSaltSync(10);
      return bcrypt.hashSync(plainTextPword, salt);
    }
  }
}

UserSchema.pre('save', function(next) {
  if (!this.isModified('password')) return next();
  this.password = this.encryptPassword(this.password);
  next();
})

const Users = mongoose.model('user', UserSchema);
module.exports = Users;
