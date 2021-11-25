const mongoose = require('mongoose');
const connectDB = require('../config/db.config');
const seedStudio = require('./seeders.studio');
const seedGear = require('./seeders.gear');
const seedArtists = require('./seeders.artists');
const seedServices = require('./seeders.services');

connectDB();

const seedDB = async () => {
  try {
    await seedStudio();
    console.log('______________ Studio Seeded ______________');

    await seedGear();
    console.log('______________ Studio Gear Seeded ______________');

    await seedArtists();
    console.log('______________ Artists Seeded ______________');

    await seedServices();
    console.log('______________ Services Seeded ______________');
  } catch (err) {
    console.log(err);
    mongoose.connection.close();
  }
};

seedDB();
