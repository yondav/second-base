const { create } = require('../../utils/mongoFuncs/create');
const { find } = require('../../utils/mongoFuncs/find');

exports.post = {
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

        data = await create.studio(
          {
            name: 'secondBase',
            logo: 'logo',
            images: ['img1', 'img2'],
            email: 'email',
            address: {
              address: '4301 3rd Ave',
              neighborhood: 'Sunset Park',
              city: 'Brooklyn',
              state: 'New York',
              zip_code: 12345,
            },
            services: ['serv1', 'serv2', 'serv3'],
          },
          studioGearId
        );
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
};
