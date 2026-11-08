const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  clinicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Clinic', required: true, index: true },
  branchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch' },
  patientNumber: { type: String, required: true, index: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  phone: { type: String, required: true, index: true },
  email: { type: String, default: '' },
  address: { type: String, default: '' },
  emergencyContact: {
    name: { type: String, default: '' },
    relationship: { type: String, default: '' },
    phone: { type: String, default: '' }
  },
  preferredContact: { type: String, enum: ['Phone', 'SMS', 'Email', 'WhatsApp'], default: 'WhatsApp' },
  medicalHistory: {
    allergies: [{ type: String }],
    conditions: [{ type: String }],
    medications: [{ type: String }],
    notes: { type: String, default: '' }
  },
  insuranceInfo: {
    providerName: { type: String, default: '' },
    policyNumber: { type: String, default: '' },
    shaNumber: { type: String, default: '' },
    status: { type: String, enum: ['Active', 'Inactive', 'Pending'], default: 'Active' }
  },
  isCompleted: { type: Boolean, default: false }
}, { timestamps: true });

patientSchema.index({ clinicId: 1, patientNumber: 1 }, { unique: true });

module.exports = mongoose.model('Patient', patientSchema);
