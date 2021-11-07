const { Artist, Project, Studio, gear } = require('../../models');

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
};
