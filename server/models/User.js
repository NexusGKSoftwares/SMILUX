const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  clinicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Clinic', required: true, index: true },
  branchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch' },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['SuperAdmin', 'ClinicOwner', 'ClinicAdmin', 'Receptionist', 'Dentist', 'DentalAssistant', 'Accountant', 'InventoryManager'],
    default: 'Receptionist'
  },
  phone: { type: String, default: '' },
  specialisation: { type: String, default: '' },
  commissionRate: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  lastLogin: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
