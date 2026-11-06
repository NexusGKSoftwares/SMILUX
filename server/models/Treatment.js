const mongoose = require('mongoose');

const treatmentSchema = new mongoose.Schema({
  clinicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Clinic', required: true, index: true },
  category: { type: String, required: true }, // e.g. Preventive, Restorative, Endodontics, Orthodontics, Surgery
  name: { type: String, required: true },
  code: { type: String, default: '' },
  cost: { type: Number, required: true },
  durationMinutes: { type: Number, default: 30 },
  description: { type: String, default: '' },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Treatment', treatmentSchema);
