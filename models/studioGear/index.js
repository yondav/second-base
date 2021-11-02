const { Schema, model } = require('mongoose');

const { ObjectId } = Schema.Type;

const studioGear = new Schema({
  name: String,
  brand: String,
  year: String,
  image: Array,
  studio_gear: {
    type: ObjectId,
    ref: 'studio_gear',
  },
});

const controlRoom = model('control_room', studioGear);
const monitoring = model('monitoring', studioGear);
const amps = model('amps', studioGear);
const drums = model('drums', studioGear);
const microphones = model('microphones', studioGear);
const guitars = model('guitars', studioGear);
const keys = model('keys', studioGear);

module.exports = {
  controlRoom,
  monitoring,
  amps,
  drums,
  microphones,
  guitars,
  keys,
};
