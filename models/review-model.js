const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  rate: { type: Number, required: true },
  command: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User'},
  room: { type: Schema.Types.ObjectId, ref: 'Room'}
});

module.exports = mongoose.model('Review', reviewSchema);