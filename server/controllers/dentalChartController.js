const DentalChart = require('../models/DentalChart');

exports.getDentalChart = async (req, res) => {
  try {
    let chart = await DentalChart.findOne({ patientId: req.params.patientId, clinicId: req.clinicId });
    if (!chart) {
      chart = await DentalChart.create({
        clinicId: req.clinicId,
        patientId: req.params.patientId,
        teeth: [],
        history: []
      });
    }
    res.json(chart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateToothCondition = async (req, res) => {
  try {
    const { patientId } = req.params;
    const { toothNumber, surface, condition, notes } = req.body;

    let chart = await DentalChart.findOne({ patientId, clinicId: req.clinicId });
    if (!chart) {
      chart = new DentalChart({ clinicId: req.clinicId, patientId, teeth: [], history: [] });
    }

    const existingToothIndex = chart.teeth.findIndex(t => t.toothNumber === Number(toothNumber));
    const previousCondition = existingToothIndex > -1 ? chart.teeth[existingToothIndex].condition : 'Healthy';

    const toothEntry = {
      toothNumber: Number(toothNumber),
      surface: surface || 'General',
      condition,
      dentistId: req.user.id,
      dentistName: req.user.name,
      date: new Date(),
      notes: notes || ''
    };

    if (existingToothIndex > -1) {
      chart.teeth[existingToothIndex] = toothEntry;
    } else {
      chart.teeth.push(toothEntry);
    }

    chart.history.push({
      toothNumber: Number(toothNumber),
      previousCondition,
      newCondition: condition,
      dentistId: req.user.id,
      dentistName: req.user.name,
      date: new Date(),
      notes: notes || ''
    });

    await chart.save();
    res.json(chart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
