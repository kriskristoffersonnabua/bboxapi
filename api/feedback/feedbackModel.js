const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FeedbackSchema = new Schema({
  appointment: {
    type: Schema.Types.ObjectId,
    ref: 'appointment'
  },
  message: String,
  // 1 - 5 stars
  rating: Number,
  tutor: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
});

module.exports = mongoose.model('feedback', FeedbackSchema)
