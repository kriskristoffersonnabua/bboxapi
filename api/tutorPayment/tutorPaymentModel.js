const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TutorPaymentSchema = new Schema({
  appointment: {
    type: Schema.Types.ObjectId,
    ref: 'appointment'
  },
  payments: [{
    date: Date,
    amount: Number
  }],
  remaining_balance: Number,
  tutor: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
});

module.exports = mongoose.model('tutorPayment', TutorPaymentSchema)
