const { Schema, model } = require('mongoose');

const { ObjectId } = Schema.Types;

const artistSchema = new Schema({
  name: String,
  projects: [{ type: ObjectId, ref: 'project' }],
});

const Artist = model('artist', artistSchema);

module.exports = Artist;
