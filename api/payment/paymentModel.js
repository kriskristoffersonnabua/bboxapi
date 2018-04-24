const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
  appointment: {
    type: Schema.Types.ObjectId,
    ref: 'appointment'
  },
  payments: [{
    date: Date,
    amount: Number
  }],
  remaining_balance: Number,
  client: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
});

module.exports = mongoose.model('payment', PaymentSchema)
