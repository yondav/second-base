const { Schema, model } = require('mongoose');

const { ObjectId } = Schema.Types;

const gearSchema = new Schema({
  name: { type: String, default: '' },
  brand: { type: String, default: '' },
  year: { type: Number, default: 0 },
  images: [{ type: ObjectId, ref: 'gear_img' }],
  description: { type: String, default: '' },
  count: { type: Number, default: 0 },
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
