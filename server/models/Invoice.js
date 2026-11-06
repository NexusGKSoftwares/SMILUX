const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  clinicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Clinic', required: true, index: true },
  branchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch' },
  invoiceNumber: { type: String, required: true, index: true },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true, index: true },
  treatmentPlanId: { type: mongoose.Schema.Types.ObjectId, ref: 'TreatmentPlan' },
  items: [{
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    toothNumber: { type: Number }
  }],
  subtotal: { type: Number, required: true },
  taxAmount: { type: Number, default: 0 },
  discountAmount: { type: Number, default: 0 },
  totalAmount: { type: Number, required: true },
  paidAmount: { type: Number, default: 0 },
  balance: { type: Number, required: true },
  status: { type: String, enum: ['Draft', 'Issued', 'PartiallyPaid', 'Paid', 'Overdue', 'Cancelled'], default: 'Issued' },
  dueDate: { type: Date }
}, { timestamps: true });

invoiceSchema.index({ clinicId: 1, invoiceNumber: 1 }, { unique: true });

module.exports = mongoose.model('Invoice', invoiceSchema);
