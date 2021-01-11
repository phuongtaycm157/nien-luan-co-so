const Booking = require('../../models/booking-model');
const Review = require('../../models/review-model');
const User = require('../../models/user-model');
const Room = require('../../models/room-model');
const Amenities = require('../../models/amenities-model')

const getUser = async (userId) => {
  try {
    const user = await User.findById(userId);
    return transformUser(user);
  } catch (error) {
    throw error
  }
}

const getRooms = async roomIds => {
  try {
    const rooms = await Room.find({ _id: {$in: roomIds}});
    return rooms.map(room => {
      return transformRoom(room);
    })
  } catch (error) {
    throw error
  }
}

const getRoom = async roomId => {
  try {
    const room = await Room.findById(roomId);
      return transformRoom(room);
  } catch (error) {
    throw error
  }
}

const getReviews = async reviewIds => {
  try {
    const reviews = await Review.find({ _id: {$in: reviewIds} });
    return reviews.map(review => {
      return transformReview(review);
    })
  } catch (error) {
    throw error
  }
};

const getAmenities = async amenitiesIds => {
  try {
    const amens = await Amenities.find({ _id: { $in: amenitiesIds } });
    return amens.map(amen => {
      return {
        _id: amen.id,
        ...amen._doc
      }
    })
  } catch (error) {
    throw error;
  }
};

const getBooking = async bookingId => {
  try {
    const booking = await Booking.findById(bookingId);
    return transformBooking(booking);
  } catch (error) {
    throw error;
  }
}

const transformBooking = booking => {
  return {
    ...booking._doc,
    _id: booking.id,
    user: getUser.bind(this, booking._doc.user),
    room: getRoom.bind(this, booking._doc.room),
    dateStart: new Date(booking._doc.dateStart).toISOString(),
    dateEnd: new Date(booking._doc.dateEnd).toISOString(),
    createdAt: new Date(booking._doc.createdAt).toISOString(),
    updatedAt: new Date(booking._doc.updatedAt).toISOString()
  }
};

const transformReview = review => {
  return {
    ...review._doc,
    _id: review.id,
    user: getUser.bind(this, review._doc.user),
    room: getRoom.bind(this, review._doc.room),
  }
};

const transformUser = user => {
  return {
    ...user._doc,
    _id: user.id,
    password: null,
    createRoom: getRooms.bind(this, user._doc.createRoom),
    reviewRoom: getReviews.bind(this, user._doc.reviewRoom),
  }
};

const transformRoom = room => {
  return {
    ...room._doc,
    _id: room.id,
    dateOpen: new Date(room._doc.dateOpen).toISOString(),
    dateClose: new Date(room._doc.dateClose).toISOString(),
    creator: getUser.bind(this,room._doc.creator),
    reviews: getReviews.bind(this, room._doc.reviews),
    amenities: getAmenities.bind(this, room._doc.amenities)
  }
};

exports.transformUser = transformUser;
exports.transformBooking = transformBooking;
exports.transformReview = transformReview;
exports.transformRoom = transformRoom;