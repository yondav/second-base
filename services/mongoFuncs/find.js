const { Artist, Studio, StudioGear, Service, User } = require('../../models');

exports.find = {
  studio: async () =>
    await Studio.findOne({ name: 'secondBase' })
      .populate({
        path: 'studio_gear',
        populate: 'control_room monitoring amps drums microphones guitars keys',
      })
      .populate({
        path: 'artists',
        populate: 'projects',
      })
      .populate({ path: 'services' }),

  studio_gear: async () =>
    await StudioGear.findOne({ name: 'studio_gear' }).populate(
      'control_room monitoring amps drums microphones guitars keys'
    ),

  artists: async () => await Artist.find().populate('projects'),

  services: async () => await Service.find(),

  user: async () => await User.find(),
};
