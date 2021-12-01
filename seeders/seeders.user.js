const { User } = require('../models');

const userSeed = {
  first_name: 'adam',
  last_name: 'reich',
  email: 'secondbase.space@gmail.com',
  password: 'password',
};

const seedUser = async () =>
  await new User({
    first_name: userSeed.first_name,
    last_name: userSeed.last_name,
    email: userSeed.email,
    password: userSeed.password,
  });

module.exports = seedUser;
