const {
  create: { artist },
} = require('../utils/crud/crud.create');

const artistSeed = [
  {
    name: 'Adir LC',
  },
  {
    name: 'Danny Aiello',
  },
  {
    name: 'Alex Orange Drink',
  },
  {
    name: 'Baglady',
  },
  {
    name: 'Bethlehem Steel',
  },
  {
    name: 'Bueno',
  },
  {
    name: 'Emmerson',
  },
  {
    name: 'Craig Finn',
  },
  {
    name: 'Dan Francia',
  },
  {
    name: 'Desaparecidos',
  },
  {
    name: 'Free $$$',
  },
  {
    name: 'Gobbin Jr',
  },
  {
    name: 'RJ Gordon',
  },
  {
    name: 'Hard Pass',
  },
  {
    name: 'Heeney',
  },
  {
    name: 'High Pony',
  },
  {
    name: 'Janitor',
  },
  {
    name: 'Leapling',
  },
  {
    name: 'Lost Boy?',
  },
  {
    name: 'Mourners',
  },
  {
    name: 'Morus Alba',
  },
  {
    name: 'Pom Pom Squad',
  },
  {
    name: 'The Prettiots',
  },
  {
    name: 'The So So Glos',
  },
  {
    name: 'Stringer',
  },
  {
    name: 'Titus Andronicus',
  },
  {
    name: 'Sarah Tudzin',
  },
  {
    name: 'Velvet Vaughan',
  },
  {
    name: 'Virginia Trance',
  },
  {
    name: 'Wicked Kind',
  },
  {
    name: 'Wisebuck',
  },
  {
    name: 'The Zells',
  },
  {
    name: 'Zomber',
  },
];

const seedArtists = () => artistSeed.forEach(async art => await artist(art));

module.exports = seedArtists;
