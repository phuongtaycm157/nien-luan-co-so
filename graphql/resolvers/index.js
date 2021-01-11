const amenities = require("./amenities");
const auth = require("./auth");
const booking = require("./booking");
const review = require('./review');
const room = require('./room');

module.exports = {
  ...amenities,
  ...auth,
  ...booking,
  ...review,
  ...room
}