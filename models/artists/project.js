const { Schema, model } = require('mongoose');

const { ObjectId } = Schema.Type;

const project = new Schema({
  name: String,
  year: String,
  links: Array,
  cover: String,
  artist: {
    type: ObjectId,
    ref: 'artist',
  },
});

module.exports = model('project', project);
