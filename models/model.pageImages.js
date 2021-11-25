const { Schema, model } = require('mongoose');

const { ObjectId } = Schema.Types;

const pageImagesSchema = new Schema({
  name: { type: String, default: 'page_images' },
  home: [{ type: ObjectId, ref: 'studio_img' }],
  about: [{ type: ObjectId, ref: 'studio_img' }],
  gear: [{ type: ObjectId, ref: 'studio_img' }],
  artists: [{ type: ObjectId, ref: 'studio_img' }],
  booking: [{ type: ObjectId, ref: 'studio_img' }],
});

const PageImages = model('page_images', pageImagesSchema);

module.exports = PageImages;
