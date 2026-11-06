const mongoose = require('mongoose');

const clinicSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  logo: { type: String, default: '' },
  address: { type: String, default: '' },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  currency: { type: String, default: 'KES' },
  timezone: { type: String, default: 'Africa/Nairobi' },
  subscriptionPlan: { type: String, enum: ['Starter', 'Professional', 'Enterprise'], default: 'Professional' },
  isSubscriptionActive: { type: Boolean, default: true },
  settings: {
    taxRate: { type: Number, default: 0 },
    invoicePrefix: { type: String, default: 'INV' },
    patientPrefix: { type: String, default: 'PAT' }
  }
}, { timestamps: true });

module.exports = mongoose.model('Clinic', clinicSchema);
