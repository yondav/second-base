const { Artist, Project, Service, gear, images } = require('../../models');

exports.remove = {
  gear: async (gearId, type) => {
    switch (type) {
      case 'control_room':
        return await gear.ControlRoom.findByIdAndDelete(gearId);
      case 'monitoring':
        return await gear.Monitoring.findByIdAndDelete(gearId);
      case 'amps':
        return await gear.Amp.findByIdAndDelete(gearId);
      case 'drums':
        return await gear.Drum.findByIdAndDelete(gearId);
      case 'microphones':
        return await gear.Microphone.findByIdAndDelete(gearId);
      case 'guitars':
        return await gear.Guitar.findByIdAndDelete(gearId);
      case 'keys':
        return await gear.Key.findByIdAndDelete(gearId);
      default:
        break;
    }
  },

  artist: async artistId => await Artist.findOneAndDelete(artistId),

  project: async projectId => await Project.findOneAndDelete(projectId),

  service: async serviceId => await Service.findByIdAndDelete(serviceId),

  image: async (imageId, parent) => {
    switch (parent) {
      case 'project':
        return await images.ProjectImg.findByIdAndDelete(imageId);
      case 'gear':
        return await images.GearImg.findByIdAndDelete(imageId);
      case 'studio':
        return await images.StudioImg.findByIdAndDelete(imageId);
      case 'user':
        return await images.UserImg.findByIdAndDelete(imageId);
      default:
        break;
    }
  },
};
