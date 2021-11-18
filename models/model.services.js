const { Schema, model } = require('mongoose');

const { ObjectId } = Schema.Types;

const serviceSchema = new Schema({
  name: String,
  description: String,
});

const Service = model('service', serviceSchema);

module.exports = Service;
