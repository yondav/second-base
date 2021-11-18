const { Schema, model } = require('mongoose');

const { ObjectId } = Schema.Types;

const studioSchema = new Schema({
  name: String,
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
    type: ObjectId,
    ref: 'studio_gear',
  },
  artists: [{ type: ObjectId, ref: 'artist' }],
  services: [{ type: ObjectId, ref: 'service' }],
});

const Studio = model('studio', studioSchema);

module.exports = Studio;
