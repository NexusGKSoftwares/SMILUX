const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  clinicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Clinic', required: true, index: true },
  branchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch' },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true, index: true },
  dentistId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  date: { type: String, required: true }, // YYYY-MM-DD
  startTime: { type: String, required: true }, // HH:mm
  endTime: { type: String, required: true }, // HH:mm
  type: { type: String, default: 'Consultation' },
  reason: { type: String, default: '' },
  status: {
    type: String,
    enum: ['Scheduled', 'Confirmed', 'CheckedIn', 'Completed', 'Cancelled', 'NoShow'],
    default: 'Scheduled'
  },
  notes: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);
