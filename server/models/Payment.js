const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  clinicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Clinic', required: true, index: true },
  invoiceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Invoice', required: true, index: true },
  invoiceNumber: { type: String, required: true },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  amount: { type: Number, required: true },
  method: { type: String, enum: ['M-Pesa', 'Cash', 'BankTransfer', 'Card', 'Insurance'], required: true },
  mpesaDetails: {
    phoneNumber: { type: String },
    checkoutRequestId: { type: String },
    merchantRequestId: { type: String },
    mpesaReceiptNumber: { type: String }
  },
  status: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Completed' },
  notes: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
