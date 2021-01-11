const Amenities = require('../../models/amenities-model');

module.exports = {
  amenities: async (args) => {
    try {
      const amens = await Amenities.find();
      return amens.map(amen => {
        return {
          name: amen._doc.name,
          _id: amen.id
        }
      })
    } catch (err) {
      throw err;
    }
  },
  createAmenities: async ({name}, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    if (req.userId !== '5ffb80d96035f82c3ca90be2') {
      throw new Error('Not Root User!');
    }
    try {
      const amen = new Amenities({
        name: name
      })
      const result = await amen.save();
      return {
        ...result._doc,
        _id: result.id
      }
    } catch (err) {
      throw err;
    }
  },
  updateAmenities: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    if (req.userId !== '5ffb80d96035f82c3ca90be2') {
      throw new Error('Not Root User!');
    }
    const prevAmenities = await Amenities.findOneAndUpdate({ _id: args.amenId }, { name: args.updateName });
    return {
      name: prevAmenities._doc.name,
      _id: prevAmenities.id
    }
  }
}