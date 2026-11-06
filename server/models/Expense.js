const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  clinicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Clinic', required: true, index: true },
  branchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch' },
  title: { type: String, required: true },
  category: { type: String, required: true }, // e.g. Internet, Electricity, Transactions, Rental Cost, Foods, Other
  amount: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['Cash', 'M-Pesa', 'BankTransfer', 'Card'], default: 'BankTransfer' },
  supplier: { type: String, default: '' },
  date: { type: Date, default: Date.now },
  notes: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Expense', expenseSchema);
