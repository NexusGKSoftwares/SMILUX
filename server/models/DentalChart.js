const mongoose = require('mongoose');

const dentalChartSchema = new mongoose.Schema({
  clinicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Clinic', required: true, index: true },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true, index: true },
  teeth: [{
    toothNumber: { type: Number, required: true }, // FDI notation e.g., 11-48 adult, 51-85 pediatric
    surface: { type: String, enum: ['Mesial', 'Distal', 'Occlusal', 'Buccal', 'Lingual', 'General'], default: 'General' },
    condition: {
      type: String,
      enum: ['Healthy', 'Cavity', 'Filling', 'Crown', 'Bridge', 'RootCanal', 'Extraction', 'Implant', 'Missing', 'Sensitivity'],
      required: true
    },
    dentistId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    dentistName: { type: String, default: '' },
    date: { type: Date, default: Date.now },
    notes: { type: String, default: '' }
  }],
  history: [{
    toothNumber: { type: Number, required: true },
    previousCondition: { type: String },
    newCondition: { type: String, required: true },
    dentistId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    dentistName: { type: String },
    date: { type: Date, default: Date.now },
    notes: { type: String }
  }]
}, { timestamps: true });

dentalChartSchema.index({ clinicId: 1, patientId: 1 }, { unique: true });

module.exports = mongoose.model('DentalChart', dentalChartSchema);
