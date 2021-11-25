const {
  create: { service },
} = require('../services/mongoFuncs/create');

const serviceSeed = [
  {
    name: 'Recording/Engineering',
  },
  {
    name: 'Music Production',
  },
  {
    name: 'Mixing',
  },
  {
    name: 'Mastering',
  },
  {
    name: 'Pre-production/Rehearsal',
  },
  {
    name: 'Composition - collaborative writing, commercial & soundtrack',
  },
  {
    name: 'Scoring',
  },
  {
    name: 'Podcast Production',
  },
  {
    name: 'Rental',
  },
];

const seedServices = () =>
  serviceSeed.forEach(async serv => await service(serv));

module.exports = seedServices;
