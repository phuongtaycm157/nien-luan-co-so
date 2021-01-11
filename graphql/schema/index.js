const { buildSchema } = require('graphql');

module.exports = buildSchema(`
input UserInput {
  email: String!
  password: String!
}

input RoomInput {
  name: String!
  price: Float!
  description: String!
  dateOpen: String!
  dateClose: String!
  address: String!
  amenities: [ID!]!
  photos: [String]!
}

input RoomUpdate {
  name: String
  price: Float
  description: String
  dateOpen: String
  dateClose: String
  address: String
  photos: [String]
}

input ReviewInput {
  roomId: ID!
  rate: Float!
  command: String!
}

type AuthData {
  userId: String!
  token: String!
  tokenExpiration: Int!
}

type User {
  _id: ID!
  email: String!
  password: String
  createRoom: [Room]!
  reviewRoom: [Review]!
}

type Room {
  _id: ID!
  name: String!
  price: Float!
  description: String!
  dateOpen: String!
  dateClose: String!
  address: String!
  creator: User!
  amenities: [Amenities!]!
  rating: Float!
  photos: [String]!
  reviews: [Review]!
}

type Review {
  _id: ID!
  rate: Float!
  command: String!
  user: User!
  room: Room!
}

type Amenities {
  _id: ID!
  name: String!
}

type Booking {
  _id: ID!
  user: User!
  room: Room!
  dateStart: String!
  dateEnd: String!
  createdAt: String!
  updatedAt: String!
}

type RootQuery {
  login(email: String!, password: String!): AuthData!
  amenities: [Amenities!]!
  rooms: [Room!]!
  bookings: [Booking!]!
  reviews: [Review!]!
}

type RootMutation {
  createUser(userInput: UserInput): User
  createAmenities(name: String!): Amenities!
  updateAmenities(amenId: ID!, updateName: String!): Amenities!
  createRoom(roomInput: RoomInput): Room!
  updateRoom(roomQuery: ID!, roomUpdate: RoomUpdate): Room!
  updateRoomPicture(roomQuery: ID!, pictureUrl: [String!]!): Room!
  bookingRoom(roomId: ID!, dateStart: String!, dateEnd: String!): Booking!
  cancelBooking(bookingId: ID!): Room!
  reviewEvent(reviewInput: ReviewInput): Review!
  editReview(reviewId: ID!, command: String!): Review!
}

schema {
  query: RootQuery
  mutation: RootMutation
}
`);