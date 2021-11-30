const { Schema, model } = require('mongoose');

const { ObjectId } = Schema.Types;

const studioSchema = new Schema({
  name: String,
  logo: String,
  email: String,
  address: {
    address: String,
    neighborhood: String,
    city: String,
    state: String,
    zip_code: Number,
  },
  services: [{ type: ObjectId, ref: 'service' }],
  images: {
    type: ObjectId,
    ref: 'page_images',
  },
});

const Studio = model('studio', studioSchema);

module.exports = Studio;
