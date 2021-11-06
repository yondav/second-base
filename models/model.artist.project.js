const { Schema, model } = require('mongoose');

const projectSchema = new Schema({
  name: String,
  year: Number,
  links: Array,
  cover: String,
});

const Project = model('project', projectSchema);

module.exports = Project;
