const { Artist, Studio, StudioGear, User } = require('../../models');

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
      }),

  studio_gear: async () =>
    await StudioGear.findOne({ name: 'studio_gear' }).populate(
      'control_room monitoring amps drums microphones guitars keys'
    ),

  artists: async () => await Artist.find().populate('projects'),

  user: async () => await User.find(),
};
