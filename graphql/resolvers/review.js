const Review = require('../../models/review-model');
const Room = require('../../models/room-model');
const { transformReview } = require('./merge');

module.exports = {
  reviews: async (args, req) => {
    try {
      const reviews = await Review.find();
      return reviews.map(review => transformReview(review));
    } catch (error) {
      throw error;
    }
  },
  reviewEvent: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const room = await Room.findById(args.reviewInput.roomId);
      const review = new Review({
        rate: +args.reviewInput.rate,
        command: args.reviewInput.command,
        user: req.userId,
        room: room.id
      })
      let rating = (room._doc.rating + review.rate) / 2;
      await Room.updateOne({_id: room.id}, {rating: rating}); 
      const result = await review.save();
      return transformReview(result);
    } catch (error) {
      throw error;
    }
  },
  editReview: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const review = await Review.findById(args.reviewId);
      let reviewObject = transformReview(review);
      reviewObject.command = args.command;
      await Review.updateOne({_id: args.reviewId}, {command: args.command});
      return reviewObject;
    } catch (error) {
      throw error;
    }
  }
};