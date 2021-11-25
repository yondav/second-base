const { Schema, model } = require('mongoose');

const { ObjectId } = Schema.Types;

const studioGearSchema = new Schema({
  name: { type: String, default: 'studio_gear' },
  control_room: [{ type: ObjectId, ref: 'control_room' }],
  monitoring: [{ type: ObjectId, ref: 'monitoring' }],
  amps: [{ type: ObjectId, ref: 'amp' }],
  drums: [{ type: ObjectId, ref: 'drum' }],
  microphones: [{ type: ObjectId, ref: 'microphone' }],
  guitars: [{ type: ObjectId, ref: 'guitar' }],
  keys: [{ type: ObjectId, ref: 'key' }],
});

const StudioGear = model('studio_gear', studioGearSchema);

module.exports = StudioGear;
