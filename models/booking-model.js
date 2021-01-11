const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User'},
  room: { type: Schema.Types.ObjectId, ref: 'Room'},
  dateStart: { type: String, required: true},
  dateEnd: { type: String, required: true}
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);