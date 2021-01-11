const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../../models/user-model');

module.exports = {
  createUser: async (args) => {
    try {
      const userAlready = await User.findOne({
        email: args.userInput.email
      });
      if (userAlready) {
        throw new Error('User exits already!')
      }

      const hashPassword = await bcrypt.hash(args.userInput.password, 12);
      const user = new User({
        email: args.userInput.email,
        password: hashPassword
      });

      const result = await user.save();
      return {
        email: result._doc.email,
        password: null,
        _id: result.id,
      };
    } catch (err) {
      throw err;
    }
  },
  login: async ({email, password}) => {
    const user = await User.findOne({email: email});
    if (!user) {
      throw new Error('User does not exist!');
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      throw new Error('Password is incorrect!');
    }
    const token = jwt.sign({
      userId: user.id,
      email: user.email
    }, process.env.SCRET_KEY, { expiresIn: '1h' });
    return {userId: user.id, token: token, tokenExpiration: 1};
  }
}