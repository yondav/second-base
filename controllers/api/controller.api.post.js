const { create } = require('../../services/mongoFuncs/create');
const { find } = require('../../services/mongoFuncs/find');

exports.postController = {
  studio: async (req, res, next) => {
    try {
      let data;
      const response = await find.studio();

      if (response) {
        data = response;
      } else {
        const newStudioGear = await create.studio_gear('studio_gear');
        console.log('\n>>Studio Gear:\n', newStudioGear);

        const studioGearId = newStudioGear._id.toString();

        data = await create.studio({ name: 'secondBase' }, studioGearId);
      }

      res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  },

  gear: async (req, res, next) => {
    try {
      const data = await create.gear(req.body, req.params.gear_type);

      res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  },

  artist: async (req, res, next) => {
    try {
      const data = await create.artist(req.body);

      res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  },

  project: async (req, res, next) => {
    try {
      const data = await create.project(req.body, req.params.artist_id);

      res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  },

  service: async (req, res, next) => {
    try {
      const data = await create.service(req.body);

      res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  },
};
