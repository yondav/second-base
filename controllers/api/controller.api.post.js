const { create } = require('../../utils/crud/crud.create');
const { find } = require('../../utils/crud/crud.read');

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
        const newPageImages = await create.page_images('page_images');
        console.log('\n>>Page Images:\n', newPageImages);

        const pageImageId = newPageImages._id.toString();

        data = await create.studio({ name: 'secondBase' }, pageImageId);
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

  image: async (req, res, next) => {
    try {
      if (req.params.sub_collection) {
        const data = await create.image({
          obj: req.body,
          parent: req.params.parent_collection,
          subParent: req.params.sub_collection,
          parentId: req.params.parent_id,
        });
        res.status(201).json(data);
      } else {
        const data = await create.image({
          obj: req.body,
          parent: req.params.parent_collection,
          parentId: req.params.parent_id,
        });
        res.status(201).json(data);
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  },
};
