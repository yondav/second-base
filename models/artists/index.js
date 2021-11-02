const { Schema, model } = require('mongoose');

const { ObjectId } = Schema.Type;

const artist = new Schema({
  name: String,
  projects: [
    {
      type: ObjectId,
      ref: 'project',
    },
  ],
  secondBase: {
    type: ObjectId,
    ref: 'secondBase',
  },
});

module.exports = model('artist', artist);
