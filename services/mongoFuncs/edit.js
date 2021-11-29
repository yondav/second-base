const {
  Artist,
  Project,
  Studio,
  Service,
  gear,
  User,
  images,
} = require('../../models');

exports.edit = {
  studio: async update =>
    await Studio.findOneAndUpdate({ name: 'secondBase' }, update, {
      new: true,
    }),

  gear: async (update, gearId, type) => {
    switch (type) {
      case 'control_room':
        return await gear.ControlRoom.findByIdAndUpdate(gearId, update, {
          new: true,
          useFindAndModify: false,
        });
      case 'monitoring':
        return await gear.Monitoring.findByIdAndUpdate(gearId, update, {
          new: true,
          useFindAndModify: false,
        });
      case 'amps':
        return await gear.Amp.findByIdAndUpdate(gearId, update, {
          new: true,
          useFindAndModify: false,
        });
      case 'drums':
        return await gear.Drum.findByIdAndUpdate(gearId, update, {
          new: true,
          useFindAndModify: false,
        });
      case 'microphones':
        return await gear.Microphone.findByIdAndUpdate(gearId, update, {
          new: true,
          useFindAndModify: false,
        });
      case 'guitars':
        return await gear.Guitar.findByIdAndUpdate(gearId, update, {
          new: true,
          useFindAndModify: false,
        });
      case 'keys':
        return await gear.Key.findByIdAndUpdate(gearId, update, {
          new: true,
          useFindAndModify: false,
        });
      default:
        break;
    }
  },

  artist: async (update, artistId) =>
    await Artist.findByIdAndUpdate(artistId, update, {
      new: true,
      useFindAndModify: false,
    }),

  project: async (update, projectId) =>
    await Project.findByIdAndUpdate(projectId, update, {
      new: true,
      useFindAndModify: false,
    }),

  service: async (update, serviceId) =>
    await Service.findByIdAndUpdate(serviceId, update, {
      new: true,
      useFindAndModify: false,
    }),

  user: async (update, userId) =>
    await User.findByIdAndUpdate(userId, update, {
      new: true,
      useFindAndModify: false,
    }),

  image: async (update, imageId, parent) => {
    switch (parent) {
      case 'project':
        return await images.ProjectImg.findByIdAndUpdate(imageId, update, {
          new: true,
          useFindAndModify: false,
        });
      case 'gear':
        return await images.GearImg.findByIdAndUpdate(imageId, update, {
          new: true,
          useFindAndModify: false,
        });
      case 'studio':
        return await images.StudioImg.findByIdAndUpdate(imageId, update, {
          new: true,
          useFindAndModify: false,
        });
      case 'user':
        return await images.UserImg.findByIdAndUpdate(imageId, update, {
          new: true,
          useFindAndModify: false,
        });
      default:
        break;
    }
  },
};
