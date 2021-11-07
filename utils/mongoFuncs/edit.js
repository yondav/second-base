const { Artist, Project, Studio, gear } = require('../../models');

exports.edit = {
  studio: async update =>
    await Studio.findOneAndUpdate({ name: 'secondBase' }, update, {
      new: true,
    }),
  gear: async (update, gearId, type) => {
    let updatedGear;

    switch (type) {
      case 'control_room':
        updatedGear = await gear.ControlRoom.findByIdAndUpdate(gearId, update, {
          new: true,
          useFindAndModify: false,
        });
      case 'monitoring':
        updatedGear = await gear.Monitoring.findByIdAndUpdate(gearId, update, {
          new: true,
          useFindAndModify: false,
        });
      case 'amps':
        updatedGear = await gear.Amp.findByIdAndUpdate(gearId, update, {
          new: true,
          useFindAndModify: false,
        });
      case 'drums':
        updatedGear = await gear.Drum.findByIdAndUpdate(gearId, update, {
          new: true,
          useFindAndModify: false,
        });
      case 'microphones':
        updatedGear = await gear.Microphone.findByIdAndUpdate(gearId, update, {
          new: true,
          useFindAndModify: false,
        });
      case 'keys':
        updatedGear = await gear.Key.findByIdAndUpdate(gearId, update, {
          new: true,
          useFindAndModify: false,
        });
      default:
        break;
    }

    return updatedGear;
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
