const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema({
  clinicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Clinic', required: true, index: true },
  name: { type: String, required: true },
  code: { type: String, required: true },
  address: { type: String, default: '' },
  phone: { type: String, default: '' },
  email: { type: String, default: '' },
  isMainBranch: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Branch', branchSchema);
