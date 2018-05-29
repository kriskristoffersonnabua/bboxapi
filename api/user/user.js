var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  email: String,
  password: String,
  firstname: String,
  lastname: String,
  contact: Number,
  address: String,
  birthday: Date,
  photo: String,
  accountType: Number,
  // 0 - male, 1 - female
  gender: Number,

  /*client needed information*/
  tutees: Array,
  // tutee_firstname: String,
  // tutee_middlename: String,
  // tutee_lastname: String,
  // tutee_birthday: Date,
  /*client end*/

  /* tutor needed information */
  subjects: [String],
  schedule: [String],

  tutorRating: Number,
  tutorPrimaryEducation: String,
  tutorSecondaryEducation: String,
  tutorTertiaryEducation: String,
  tutorOtherEducation: String,
  approved: Boolean,
  /* tutor  end*/
});

UserSchema.methods = {
  // check the passwords on signin
  authenticate: function(plainTextPword) {
    return bcrypt.compareSync(plainTextPword, this.password);
  },
  // hash the passwords
  encryptPassword: function(plainTextPword) {
    if (!plainTextPword) {
      return '';
    } else {
      var salt = bcrypt.genSaltSync(10);
      return bcrypt.hashSync(plainTextPword, salt);
    }
  },
};

UserSchema.pre('save', function(next) {
  if (!this.isModified('password')) return next();
  this.password = this.encryptPassword(this.password);
  next();
});

UserSchema.index({subjects: 'text', firstname: 'text', lastname: 'text'});

const Users = mongoose.model('user', UserSchema);
module.exports = Users;
