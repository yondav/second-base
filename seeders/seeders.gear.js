const {
  create: { gear },
} = require('../services/mongoFuncs/create');

const controlRoomSeed = [
  {
    name: '16-channel console',
    brand: 'neotek',
    year: 1982,
    description: 'recapped in 2016',
  },
  {
    name: 'Apollo 16',
    brand: 'Universal Audio',
  },
  {
    name: 'Pro Tools',
    brand: 'Avid',
    year: 2020,
  },
  {
    name: '6176 Channel Strip',
    brand: 'Universal Audio',
    description: '610 preamp w/1176 compressor',
  },
  {
    name: 'x81',
    brand: 'Vintech',
    count: 2,
  },
  {
    name: 'ISA Two',
    brand: 'Focusrite',
  },
  {
    name: 'EL8X Distressor',
    brand: 'Empirical Labs',
  },
];

const monitoringSeed = [
  {
    name: 'A7x',
    brand: 'Adam',
  },
  {
    name: 'HS7s',
    brand: 'Yamaha',
  },
  {
    name: 'HS5s',
    brand: 'Yamaha',
  },
  {
    name: '5C',
    brand: 'Auratone',
  },
  {
    name: 'D-Box',
    brand: 'Dangerous',
  },
  {
    name: 'P16 cue system',
    brand: '',
    description: '5-way headphone mixes',
  },
];

const ampsSeed = [
  {
    name: 'Super Reverb',
    brand: 'Fender',
  },
  {
    name: 'Prosonic',
    brand: 'Fender',
  },
  {
    name: 'Deville',
    brand: 'Fender',
    description: '4x10 tweed',
  },
  {
    name: 'AC4TV',
    brand: 'Vox',
  },
  {
    name: 'Rockerverb 50',
    brand: 'Orange',
  },
  {
    name: 'HD212',
    brand: 'MusicMan',
  },
  {
    name: 'U65-RN',
    brand: 'Univox',
  },
  {
    name: 'Roebuck Silicon',
    brand: 'Sears',
  },
  {
    name: '1/2W',
    brand: 'Honeytone',
    description: '9V powered',
  },
  {
    name: 'SVT-3 Pro',
    brand: 'Ampeg',
  },
  {
    name: 'Little Mark III',
    brand: 'Markbass',
  },
  {
    name: 'custom cab',
    brand: 'Bergentino',
    description: '6x10',
  },
];

const microphonesSeed = [
  {
    name: 'FET 47',
    brand: 'Neumann',
  },
  {
    name: 'C414',
    brand: 'AKG',
    count: 2,
  },
  {
    name: 'MK 012',
    brand: 'Oktava',
    count: 2,
  },
  {
    name: 'e904',
    brand: 'Sennheiser',
    count: 2,
  },
  {
    name: 'SM57',
    brand: 'Shure',
    count: 2,
  },
  {
    name: 'Beta 58',
    brand: 'Shure',
    count: 3,
  },
  {
    name: 'Elly',
    brand: 'Beezneez',
  },
  {
    name: 'M160',
    brand: 'Beyerdynamic',
  },
  {
    name: 'SM7',
    brand: 'Shure',
  },
  {
    name: '4033a',
    brand: 'Audio Technica',
  },
  {
    name: 'C452e',
    brand: 'AKG',
    description: 'omni',
  },
  {
    name: '215',
    brand: 'Apex',
    description: 'ribbon',
  },
  {
    name: 'KMS 105',
    brand: 'Neumann',
  },
  {
    name: 'M201',
    brand: 'Beyerdynamic',
  },
  {
    name: 'NTI-A',
    brand: 'Rode',
  },
  {
    name: 'D112',
    brand: 'AKG',
  },
  {
    name: 'Beta 91A',
    brand: 'Shure',
  },
  {
    name: 'Unidyne 57',
    brand: 'Shure',
  },
  {
    name: 'Beta 52',
    brand: 'Shure',
  },
  {
    name: 'Beta 57',
    brand: 'Shure',
  },
  {
    name: 'Beta 56A',
    brand: 'Shure',
  },
  {
    name: 'PG 81',
    brand: 'Shure',
  },
  {
    name: 'e602',
    brand: 'Sennheiser',
  },
  {
    name: 'V7',
    brand: 'sE',
  },
];

const guitarsSeed = [
  {
    name: 'Telecaster',
    brand: 'Fender',
    description: '52 reissue USA',
  },
  {
    name: 'Stratocaster',
    brand: 'Fender',
    description: '62 reissue',
  },
  {
    name: 'Jazzmaster',
    brand: 'Fender',
    description: 'USA',
  },
  {
    name: 'SG Standard',
    brand: 'Gibson',
  },
  {
    name: 'Flying V',
    brand: 'Gibson',
  },
  {
    name: 'Custom 22',
    brand: 'Paul Reed Smith',
  },
  {
    name: 'J-50',
    brand: 'Gibson',
    year: 1963,
    description: 'acoustic',
  },
  {
    name: '12-string',
    brand: 'Martin',
    description: 'acoustic',
  },
];

const keysSeed = [
  {
    name: 'C2 Organ',
    brand: 'Hammond',
  },
  {
    name: 'Spinet Piano',
    brand: 'Huntington',
  },
  {
    name: 'Fantom G7',
    brand: 'Roland',
  },
  {
    name: 'Minilogue',
    brand: 'Korg',
  },
  {
    name: 'MT-210',
    brand: 'Casio',
  },
  {
    name: 'MT-210',
    brand: 'Casio',
  },
  {
    name: 'MLM',
    brand: 'Wurlitzer',
  },
  {
    name: 'Drum Brute',
    brand: 'Arturia',
  },
  {
    name: 'Dr. Rhythm-770',
    brand: 'Boss',
  },
  {
    name: 'SP-555',
    brand: 'Roland',
  },
  {
    name: 'Impulse 61',
    brand: 'Novation',
  },
  {
    name: 'MPK Mini',
    brand: 'Akai',
  },
  {
    name: 'PadaKontrol',
    brand: 'Korg',
  },
];

const drumsSeed = [
  {
    name: 'Catalina Maple',
    brand: 'Gretsch',
    description: '22" kick, 14" snare, 12" rack, 16" floor',
  },
  {
    name: 'Starclassic Toms',
    brand: 'Tama',
    description: '12" & 14"',
  },
  {
    name: 'Club Kick',
    brand: 'Rogers',
    description: '20"',
  },
  {
    name: 'Export Kick',
    brand: 'Pearl',
    description: '22"',
  },
  {
    name: 'Assorted Cymbals',
    brand: 'Zildjian, HHX, Sabian, Istanbul',
  },
];

const seedGear = () => {
  controlRoomSeed.forEach(async cr => await gear(cr, 'control_room'));
  monitoringSeed.forEach(async mon => await gear(mon, 'monitoring'));
  ampsSeed.forEach(async amp => await gear(amp, 'amps'));
  microphonesSeed.forEach(async mic => await gear(mic, 'microphones'));
  guitarsSeed.forEach(async guit => await gear(guit, 'guitars'));
  keysSeed.forEach(async key => await gear(key, 'keys'));
  drumsSeed.forEach(async drum => await gear(drum, 'drums'));
};

module.exports = seedGear;
