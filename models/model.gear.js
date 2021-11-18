const { Schema, model } = require('mongoose');

const gearSchema = new Schema({
  name: String,
  brand: String,
  year: Number,
  image: Array,
  description: String,
  count: Number,
});

const gear = {
  ControlRoom: model('control_room', gearSchema),
  Monitoring: model('monitoring', gearSchema),
  Amp: model('amp', gearSchema),
  Drum: model('drum', gearSchema),
  Microphone: model('microphone', gearSchema),
  Guitar: model('guitar', gearSchema),
  Key: model('key', gearSchema),
};

module.exports = gear;
