const mongoose = require('mongoose');

const insuranceProviderSchema = new mongoose.Schema({
  clinicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Clinic', required: true, index: true },
  name: { type: String, required: true },
  code: { type: String, default: '' },
  contactEmail: { type: String, default: '' },
  contactPhone: { type: String, default: '' },
  isShaCompatible: { type: Boolean, default: false },
  notes: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('InsuranceProvider', insuranceProviderSchema);
