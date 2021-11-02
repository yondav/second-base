const { Schema, model } = require('mongoose');

const { ObjectId } = Schema.Type;

const secondBase = new Schema({
  logo: String,
  images: Array,
  email: String,
  address: {
    address: String,
    neighborhood: String,
    city: String,
    state: String,
    zip_code: Number,
  },
  studio_gear: {
    control_room: [{ type: ObjectId, ref: 'control_room' }],
    monitoring: [{ type: ObjectId, ref: 'monitoring' }],
    amps: [{ type: ObjectId, ref: 'amps' }],
    drums: [{ type: ObjectId, ref: 'drums' }],
    microphones: [{ type: ObjectId, ref: 'microphones' }],
    guitars: [{ type: ObjectId, ref: 'guitars' }],
    keys: [{ type: ObjectId, ref: 'keys' }],
  },
  artists: [{ type: ObjectId, ref: 'artist' }],
  services: Array,
});

module.exports = model('secondBase', secondBase);
