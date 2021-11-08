const { edit } = require('../../utils/mongoFuncs/edit');

exports.putController = {
  studio: async (req, res, next) => {
    try {
      const data = await edit.studio(req.body);

      res.status(202).json(data);
    } catch (err) {
      next(err);
    }
  },

  gear: async (req, res, next) => {
    try {
      const data = await edit.gear(
        req.body,
        req.params.gear_id,
        req.params.gear_type
      );

      res.status(202).json(data);
    } catch (err) {
      next(err);
    }
  },

  artist: async (req, res, next) => {
    try {
      const data = await edit.artist(req.body, req.params.artist_id);

      res.status(202).json(data);
    } catch (err) {
      next(err);
    }
  },

  project: async (req, res, next) => {
    try {
      const data = await edit.project(req.body, req.params.project_id);

      res.status(202).json(data);
    } catch (err) {
      next(err);
    }
  },
};
