const {
  create: { studio, studio_gear, page_images },
} = require('../services/mongoFuncs/create');

const studioSeed = {
  name: 'secondBase',
  logo: 'https://res.cloudinary.com/yup-schlepp/image/upload/v1637615649/secondBase/full-width-white_hgqnv9.svg',
  email: 'secondbase.space@gmail.com',
  address: {
    address: '4306 3rd Ave',
    neighborhood: 'Sunset Park',
    city: 'Brooklyn',
    state: 'New York',
    zip_code: 11232,
  },
};

const seedStudio = async () => {
  const newStudioGear = await studio_gear('studio_gear');
  const newPageImages = await page_images('page_images');
  await studio(studioSeed, newStudioGear._id, newPageImages._id);
};

module.exports = seedStudio;
