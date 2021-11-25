const { Schema, model } = require('mongoose');

const serviceSchema = new Schema({
  name: String,
  description: { type: String, default: '' },
});

const Service = model('service', serviceSchema);

module.exports = Service;
