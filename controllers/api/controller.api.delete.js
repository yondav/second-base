const { remove } = require('../../services/mongoFuncs/remove');

exports.deleteController = {
  gear: async (req, res, next) => {
    try {
      const data = await remove.gear(req.params.gear_id, req.params.gear_type);

      res
        .status(200)
        .json({ success: true, message: `${data.name} has been removed` });
    } catch (err) {
      next(err);
    }
  },

  artist: async (req, res, next) => {
    try {
      const data = await remove.artist(req.params.artist_id);

      res
        .status(200)
        .json({ success: true, message: `${data.name} has been removed` });
    } catch (err) {
      next(err);
    }
  },

  project: async (req, res, next) => {
    try {
      const data = await remove.project(req.params.project_id);

      res
        .status(200)
        .json({ success: true, message: `${data.name} has been removed` });
    } catch (err) {
      next(err);
    }
  },

  service: async (req, res, next) => {
    try {
      const data = await remove.service(req.params.service_id);

      res
        .status(200)
        .json({ success: true, message: `${data.name} has been removed` });
    } catch (err) {
      next(err);
    }
  },

  image: async (req, res, next) => {
    try {
      const data = await remove.images(
        req.params.img_id,
        req.params.collection
      );

      res
        .status(200)
        .json({
          success: true,
          message: `image ${data._id} has been removed`,
          data,
        });
    } catch (err) {
      next(err);
    }
  },
};
