const Room = require('../../models/room-model');
const User = require('../../models/user-model');
const { transformRoom } = require('./merge');

module.exports = {
  rooms: async () => {
    const rooms = await Room.find();
    return rooms.map(room => {
      return transformRoom(room);
    })
  },
  createRoom: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!')
    }
    try {
      const room = new Room({
        name: args.roomInput.name,
        price: +args.roomInput.price,
        description: args.roomInput.description,
        dateOpen: new Date(args.roomInput.dateOpen).toISOString(),
        dateClose: new Date(args.roomInput.dateClose).toISOString(),
        address: args.roomInput.address,
        amenities: args.roomInput.amenities,
        photos: args.roomInput.photos,
        creator: req.userId,
        rating: 10.0,
        reviews: []
      })
      const result = await room.save();
      const createdRoom = transformRoom(result);

      const user = await User.findById(req.userId);
      if (!user) {
        throw new Error('User doesn\'t exit!');
      }
      user.createRoom.push(createdRoom._id);

      await user.save();

      return createdRoom;
    } catch (error) {
      throw error;
    }
  },
  updateRoom: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!')
    }
    try {
      const room = await Room.findById(args.roomQuery);
      if (req.userId !== room._doc.creator.toString()) {
        throw new Error('You are not creator!');
      }
      await Room.updateOne({_id: args.roomQuery}, args.roomUpdate);
      
      return transformRoom(room);
    } catch (error) {
      throw error;
    }
  },
  updateRoomPicture: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!')
    }
    try {
      const room = await Room.findById(args.roomQuery);
      if (req.userId !== room._doc.creator) {
        throw new Error('You are not creator!');
      }
      // await Room.updateOne({_id: args.roomQuery}, args.roomUpdate);
      room._doc.photos.append(args.pictureUrl);
      await Room.deleteOne({_id:args.roomQuery});
      room.save();
      return transformRoom(room);
    } catch (error) {
      throw error;
    }
  }
};