const { Artist, Studio, StudioGear, Service, User } = require('../../models');

exports.find = {
  studio: async () =>
    await Studio.findOne({ name: 'secondBase' })
      .populate({ path: 'services' })
      .populate({
        path: 'images',
        populate: 'home about gear artists booking',
      }),

  studio_gear: async () =>
    await StudioGear.findOne({ name: 'studio_gear' }).populate({
      path: 'control_room monitoring amps drums microphones guitars keys',
      populate: 'images',
    }),

  artists: async () =>
    await Artist.find().populate({ path: 'projects', populate: 'images' }),

  services: async () => await Service.find(),

  user: async () => await User.find().populate('images'),
};
