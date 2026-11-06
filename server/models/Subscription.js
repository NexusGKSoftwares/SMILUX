const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  clinicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Clinic', required: true, index: true },
  planName: { type: String, enum: ['Starter', 'Professional', 'Enterprise'], required: true },
  price: { type: Number, required: true },
  billingCycle: { type: String, enum: ['Monthly', 'Annual'], default: 'Monthly' },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, required: true },
  status: { type: String, enum: ['Active', 'PastDue', 'Cancelled', 'Trial'], default: 'Active' }
}, { timestamps: true });

module.exports = mongoose.model('Subscription', subscriptionSchema);
