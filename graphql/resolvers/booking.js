const Booking = require('../../models/booking-model');
const Room = require('../../models/room-model');
const { transformBooking, transformRoom } = require('./merge');

module.exports = {
  bookings: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const bookings = await Booking.find();
      return bookings.map(booking => transformBooking(booking));
    } catch (error) {
      throw error
    }
  },
  bookingRoom: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const room = await Room.findById(args.roomId);
      const booking = new Booking({
        user: req.userId,
        room: room.id,
        dateStart: new Date(args.dateStart).toISOString(),
        dateEnd: new Date(args.dateEnd).toISOString()
      })
      const result = await booking.save();
      console.log(result._doc);
      return transformBooking(result);
    } catch (error) {
      throw error;
    }
  },
  cancelBooking: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const booking = await Booking.findById(args.bookingId).populate('room');
      const room = transformRoom(booking.room);
      await Booking.deleteOne({_id: args.bookingId});
      return room;
    } catch (error) {
      throw error;
    }
  }
};