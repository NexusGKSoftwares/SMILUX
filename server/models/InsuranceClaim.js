const mongoose = require('mongoose');

const insuranceClaimSchema = new mongoose.Schema({
  clinicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Clinic', required: true, index: true },
  providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'InsuranceProvider', required: true },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  invoiceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Invoice' },
  claimNumber: { type: String, required: true, index: true },
  amountClaimed: { type: Number, required: true },
  amountApproved: { type: Number, default: 0 },
  status: { type: String, enum: ['Submitted', 'UnderReview', 'Approved', 'Rejected', 'Reconciled'], default: 'Submitted' },
  shaRefNumber: { type: String, default: '' },
  notes: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('InsuranceClaim', insuranceClaimSchema);
