const mongoose = require('mongoose');

const treatmentPlanSchema = new mongoose.Schema({
  clinicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Clinic', required: true, index: true },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true, index: true },
  dentistId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  items: [{
    treatmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Treatment' },
    name: { type: String, required: true },
    toothNumber: { type: Number },
    cost: { type: Number, required: true },
    status: { type: String, enum: ['Pending', 'Completed', 'Cancelled'], default: 'Pending' }
  }],
  estimatedCost: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  totalCost: { type: Number, required: true },
  status: { type: String, enum: ['Draft', 'Approved', 'InProgress', 'Completed', 'Cancelled'], default: 'Approved' },
  notes: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('TreatmentPlan', treatmentPlanSchema);
