const { Schema, model } = require('mongoose');

const { ObjectId } = Schema.Types;

const projectSchema = new Schema({
  name: String,
  year: Number,
  links: Array,
  images: [{ type: ObjectId, ref: 'project_img' }],
});

const Project = model('project', projectSchema);

module.exports = Project;
