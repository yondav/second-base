const { remove } = require('../../utils/mongoFuncs/remove');

exports.delete_ = {
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
};