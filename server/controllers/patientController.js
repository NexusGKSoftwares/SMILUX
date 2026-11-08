const Patient = require('../models/Patient');
const DentalChart = require('../models/DentalChart');
const Appointment = require('../models/Appointment');
const Invoice = require('../models/Invoice');
const TreatmentPlan = require('../models/TreatmentPlan');

exports.getPatients = async (req, res) => {
  try {
    const { search, page = 1, limit = 20 } = req.query;
    const query = { clinicId: req.clinicId, isCompleted: false };

    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { patientNumber: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }

    const patients = await Patient.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Patient.countDocuments(query);

    res.json({ patients, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findOne({ _id: req.params.id, clinicId: req.clinicId });
    if (!patient) return res.status(404).json({ message: 'Patient not found' });

    const [appointments, treatmentPlans, invoices, dentalChart] = await Promise.all([
      Appointment.find({ patientId: patient._id }).populate('dentistId', 'name').sort({ date: -1 }),
      TreatmentPlan.find({ patientId: patient._id }).populate('dentistId', 'name').sort({ createdAt: -1 }),
      Invoice.find({ patientId: patient._id }).sort({ createdAt: -1 }),
      DentalChart.findOne({ patientId: patient._id })
    ]);

    res.json({ patient, appointments, treatmentPlans, invoices, dentalChart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createPatient = async (req, res) => {
  try {
    const { firstName, lastName, dob, gender, phone, email, address, emergencyContact, preferredContact, medicalHistory, insuranceInfo } = req.body;

    const count = await Patient.countDocuments({ clinicId: req.clinicId });
    const patientNumber = `PAT-${new Date().getFullYear()}-${String(count + 1).padStart(4, '0')}`;

    const patient = await Patient.create({
      clinicId: req.clinicId,
      patientNumber,
      firstName,
      lastName,
      dob,
      gender,
      phone,
      email,
      address,
      emergencyContact,
      preferredContact,
      medicalHistory,
      insuranceInfo
    });

    // Create empty dental chart for patient
    await DentalChart.create({
      clinicId: req.clinicId,
      patientId: patient._id,
      teeth: [],
      history: []
    });

    res.status(201).json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findOneAndUpdate(
      { _id: req.params.id, clinicId: req.clinicId },
      req.body,
      { new: true }
    );
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.archivePatient = async (req, res) => {
  try {
    const patient = await Patient.findOneAndUpdate(
      { _id: req.params.id, clinicId: req.clinicId },
      { isCompleted: true },
      { new: true }
    );
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    res.json({ message: 'Patient Completed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
