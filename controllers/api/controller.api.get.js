const { find } = require('../../utils/mongoFuncs/find');

exports.getController = {
  studio: async (req, res, next) => {
    try {
      const data = await find.studio();

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  },

  studio_gear: async (req, res, next) => {
    try {
      const data = await find.studio_gear();

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  },

  artists: async (req, res, next) => {
    try {
      const data = await find.artists();

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  },

  user: async (req, res, next) => {
    try {
      const data = await find.user();

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  },
};
