const Appointment = require('../models/Appointment');

exports.getAppointments = async (req, res) => {
  try {
    const { date, dentistId, status } = req.query;
    const query = { clinicId: req.clinicId };

    if (date) query.date = date;
    if (dentistId) query.dentistId = dentistId;
    if (status) query.status = status;

    const appointments = await Appointment.find(query)
      .populate('patientId', 'firstName lastName patientNumber phone email')
      .populate('dentistId', 'name specialisation')
      .sort({ date: 1, startTime: 1 });

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createAppointment = async (req, res) => {
  try {
    const { patientId, dentistId, date, startTime, endTime, type, reason, notes } = req.body;

    // Check dentist conflict
    const conflict = await Appointment.findOne({
      clinicId: req.clinicId,
      dentistId,
      date,
      status: { $nin: ['Cancelled', 'NoShow'] },
      $or: [
        { startTime: { $lt: endTime, $gte: startTime } },
        { endTime: { $gt: startTime, $lte: endTime } }
      ]
    });

    if (conflict) {
      return res.status(400).json({ message: 'Dentist already has an appointment during this time slot.' });
    }

    const appointment = await Appointment.create({
      clinicId: req.clinicId,
      patientId,
      dentistId,
      date,
      startTime,
      endTime,
      type: type || 'Consultation',
      reason: reason || '',
      notes: notes || '',
      status: 'Scheduled'
    });

    const populated = await Appointment.findById(appointment._id)
      .populate('patientId', 'firstName lastName patientNumber phone')
      .populate('dentistId', 'name');

    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findOneAndUpdate(
      { _id: req.params.id, clinicId: req.clinicId },
      req.body,
      { new: true }
    ).populate('patientId', 'firstName lastName patientNumber phone').populate('dentistId', 'name');

    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
