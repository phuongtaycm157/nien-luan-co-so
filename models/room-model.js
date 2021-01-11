const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
  name: { type: String, required: true},
  price: { type: Number, required: true},
  description: { type: String, required: true},
  dateOpen: { type: String, required: true},
  dateClose: { type: String, required: true},
  address: { type: String, required: true},
  creator: { type: Schema.Types.ObjectId, ref: 'User' },
  amenities: [{
    type: Schema.Types.ObjectId,
    ref: 'Amenities'
  }],
  rating: { type: Number, required: true},
  photos: [
    { type: String }
  ],
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: 'Review'
  }]
});

module.exports = mongoose.model('Room', roomSchema)