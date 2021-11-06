const { Artist, Project, Studio, StudioGear, gear } = require('../../models');

exports.create = {
  studio: (studio, studioGearId) => {
    const newStudio = new Studio({ ...studio, studio_gear: studioGearId });

    return newStudio.save();
  },
  studio_gear: name => {
    const newStudioGear = new StudioGear({ name });

    return newStudioGear.save();
  },
  gear: async (obj, type) => {
    const studioGear = await StudioGear.findOne({ name: 'studio_gear' });
    let newGear;

    switch (type) {
      case 'control_room':
        newGear = new gear.ControlRoom(obj);
        await newGear.save();
        return StudioGear.findByIdAndUpdate(
          studioGear._id,
          { $push: { control_room: newGear._id } },
          { new: true, useFindAndModify: false }
        );
      case 'monitoring':
        newGear = new gear.Monitoring(obj);
        await newGear.save();
        return StudioGear.findByIdAndUpdate(
          studioGear._id,
          { $push: { monitoring: newGear._id } },
          { new: true, useFindAndModify: false }
        );
      case 'amps':
        newGear = new gear.Amps(obj);
        await newGear.save();
        return StudioGear.findByIdAndUpdate(
          studioGear._id,
          { $push: { amps: newGear._id } },
          { new: true, useFindAndModify: false }
        );
      case 'drums':
        newGear = new gear.Drums(obj);
        await newGear.save();
        return StudioGear.findByIdAndUpdate(
          studioGear._id,
          { $push: { drums: newGear._id } },
          { new: true, useFindAndModify: false }
        );
      case 'microphones':
        newGear = new gear.Microphones(obj);
        await newGear.save();
        return StudioGear.findByIdAndUpdate(
          studioGear._id,
          { $push: { microphones: newGear._id } },
          { new: true, useFindAndModify: false }
        );
      case 'guitars':
        newGear = new gear.Guitars(obj);
        await newGear.save();
        return StudioGear.findByIdAndUpdate(
          studioGear._id,
          { $push: { guitars: newGear._id } },
          { new: true, useFindAndModify: false }
        );
      case 'keys':
        newGear = new gear.Keys(obj);
        await newGear.save();
        return StudioGear.findByIdAndUpdate(
          studioGear._id,
          { $push: { keys: newGear._id } },
          { new: true, useFindAndModify: false }
        );
      default:
        break;
    }
  },
  artist: async artist => {
    const studio = await Studio.findOne({ name: 'secondBase' });
    console.log(studio);

    const newArtist = new Artist(artist);
    await newArtist.save();

    return Studio.findByIdAndUpdate(
      studio._id,
      { $push: { artists: newArtist._id } },
      { new: true, useFindAndModify: false }
    );
  },
  project: async (project, artistId) => {
    const newProject = new Project(project);
    await newProject.save();

    return Artist.findByIdAndUpdate(
      artistId,
      { $push: { projects: newProject._id } },
      { new: true, useFindAndModify: false }
    );
  },
};
