const { Schema, model } = require('mongoose');

const imageSchema = new Schema({
  sequence: { type: Number, default: 0 },
  photo_credit: String,
  url: String,
});

const images = {
  ProjectImg: model('project_img', imageSchema),
  GearImg: model('gear_img', imageSchema),
  StudioImg: model('studio_img', imageSchema),
  UserImg: model('user_img', imageSchema),
};

module.exports = images;
