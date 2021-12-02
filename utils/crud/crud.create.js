const {
  Artist,
  Project,
  Studio,
  StudioGear,
  Service,
  gear,
  images,
  User,
  PageImages,
} = require('../../models');

exports.create = {
  studio: (studio, pageImagesId) => {
    const newStudio = new Studio({ ...studio, images: pageImagesId });
    return newStudio.save();
  },

  studio_gear: name => {
    const newStudioGear = new StudioGear({ name });
    return newStudioGear.save();
  },

  gear: async (obj, type) => {
    let studioGear = await StudioGear.findOne({ name: 'studio_gear' });

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
        newGear = new gear.Amp(obj);
        await newGear.save();
        return StudioGear.findByIdAndUpdate(
          studioGear._id,
          { $push: { amps: newGear._id } },
          { new: true, useFindAndModify: false }
        );

      case 'drums':
        newGear = new gear.Drum(obj);
        await newGear.save();
        return StudioGear.findByIdAndUpdate(
          studioGear._id,
          { $push: { drums: newGear._id } },
          { new: true, useFindAndModify: false }
        );

      case 'microphones':
        newGear = new gear.Microphone(obj);
        await newGear.save();
        return StudioGear.findByIdAndUpdate(
          studioGear._id,
          { $push: { microphones: newGear._id } },
          { new: true, useFindAndModify: false }
        );

      case 'guitars':
        newGear = new gear.Guitar(obj);
        await newGear.save();
        return StudioGear.findByIdAndUpdate(
          studioGear._id,
          { $push: { guitars: newGear._id } },
          { new: true, useFindAndModify: false }
        );

      case 'keys':
        newGear = new gear.Key(obj);
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

  service: async service => {
    const studio = await Studio.findOne({ name: 'secondBase' });
    const newService = new Service(service);
    await newService.save();

    await Studio.findByIdAndUpdate(
      studio._id,
      { $push: { services: newService._id } },
      { new: true, useFindAndModify: false }
    );

    return newService;
  },

  page_images: async name => {
    const newPageImages = new PageImages({ name });
    return newPageImages.save();
  },

  image: async ({ obj, parent, subParent, parentId }) => {
    let newImg;

    switch (parent) {
      case 'project':
        const project = await Project.findById(parentId);
        newImg = new images.ProjectImg({
          ...obj,
          sequence: project.images.length,
        });
        await newImg.save();
        return Project.findByIdAndUpdate(
          parentId,
          { $push: { images: newImg._id } },
          { new: true, useFindAndModify: false }
        );

      case 'gear':
        const studioGear = await StudioGear.find({ name: 'studio_gear' });
        newImg = new images.GearImg({
          ...obj,
          sequence: studioGear[subParent].length,
        });
        await newImg.save();

        switch (subParent) {
          case 'control_room':
            return gear.ControlRoom.findByIdAndUpdate(
              parentId,
              { $push: { images: newImg._id } },
              { new: true, useFindAndModify: false }
            );

          case 'monitoring':
            return gear.Monitoring.findByIdAndUpdate(
              parentId,
              { $push: { images: newImg._id } },
              { new: true, useFindAndModify: false }
            );

          case 'amps':
            return gear.Amp.findByIdAndUpdate(
              parentId,
              { $push: { images: newImg._id } },
              { new: true, useFindAndModify: false }
            );

          case 'drums':
            return gear.Drum.findByIdAndUpdate(
              parentId,
              { $push: { images: newImg._id } },
              { new: true, useFindAndModify: false }
            );

          case 'microphones':
            return gear.Microphone.findByIdAndUpdate(
              parentId,
              { $push: { images: newImg._id } },
              { new: true, useFindAndModify: false }
            );

          case 'guitars':
            return gear.Guitar.findByIdAndUpdate(
              parentId,
              { $push: { images: newImg._id } },
              { new: true, useFindAndModify: false }
            );

          case 'keys':
            return gear.Key.findByIdAndUpdate(
              parentId,
              { $push: { images: newImg._id } },
              { new: true, useFindAndModify: false }
            );

          default:
            break;
        }

      case 'studio':
        newImg = new images.StudioImg(obj);
        await newImg.save();
        switch (subParent) {
          case 'home':
            await PageImages.findByIdAndUpdate(
              parentId,
              { $push: { home: newImg._id } },
              { new: true, useFindAndModify: false }
            );
            return newImg;

          case 'about':
            await PageImages.findByIdAndUpdate(
              parentId,
              { $push: { about: newImg._id } },
              { new: true, useFindAndModify: false }
            );
            return newImg;

          case 'gear':
            await PageImages.findByIdAndUpdate(
              parentId,
              { $push: { gear: newImg._id } },
              { new: true, useFindAndModify: false }
            );
            return newImg;

          case 'artists':
            await PageImages.findByIdAndUpdate(
              parentId,
              { $push: { artists: newImg._id } },
              { new: true, useFindAndModify: false }
            );
            return newImg;

          case 'booking':
            await PageImages.findByIdAndUpdate(
              parentId,
              { $push: { booking: newImg._id } },
              { new: true, useFindAndModify: false }
            );
            return newImg;

          default:
            break;
        }
        return newImg;

      case 'user':
        newImg = new images.UserImg(obj);
        await newImg.save();
        await User.findByIdAndUpdate(
          parentId,
          { $push: { images: newImg._id } },
          { new: true, useFindAndModify: false }
        );
        return newImg;
      default:
        break;
    }
  },
};
