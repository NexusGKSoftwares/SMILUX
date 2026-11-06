const Treatment = require('../models/Treatment');
const TreatmentPlan = require('../models/TreatmentPlan');
const Invoice = require('../models/Invoice');

exports.getTreatments = async (req, res) => {
  try {
    const treatments = await Treatment.find({ clinicId: req.clinicId, isActive: true }).sort({ category: 1, name: 1 });
    res.json(treatments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createTreatment = async (req, res) => {
  try {
    const treatment = await Treatment.create({ ...req.body, clinicId: req.clinicId });
    res.status(201).json(treatment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTreatmentPlans = async (req, res) => {
  try {
    const { patientId } = req.query;
    const query = { clinicId: req.clinicId };
    if (patientId) query.patientId = patientId;

    const plans = await TreatmentPlan.find(query)
      .populate('patientId', 'firstName lastName patientNumber')
      .populate('dentistId', 'name')
      .sort({ createdAt: -1 });

    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createTreatmentPlan = async (req, res) => {
  try {
    const { patientId, dentistId, title, items, discount = 0, notes } = req.body;

    const estimatedCost = items.reduce((sum, item) => sum + Number(item.cost), 0);
    const totalCost = Math.max(0, estimatedCost - Number(discount));

    const plan = await TreatmentPlan.create({
      clinicId: req.clinicId,
      patientId,
      dentistId: dentistId || req.user.id,
      title,
      items,
      estimatedCost,
      discount,
      totalCost,
      notes,
      status: 'Approved'
    });

    res.status(201).json(plan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.convertToInvoice = async (req, res) => {
  try {
    const plan = await TreatmentPlan.findOne({ _id: req.params.id, clinicId: req.clinicId });
    if (!plan) return res.status(404).json({ message: 'Treatment plan not found' });

    const count = await Invoice.countDocuments({ clinicId: req.clinicId });
    const invoiceNumber = `INV-${new Date().getFullYear()}-${String(count + 1).padStart(4, '0')}`;

    const invoiceItems = plan.items.map(item => ({
      description: item.name,
      amount: item.cost,
      toothNumber: item.toothNumber
    }));

    const invoice = await Invoice.create({
      clinicId: req.clinicId,
      invoiceNumber,
      patientId: plan.patientId,
      treatmentPlanId: plan._id,
      items: invoiceItems,
      subtotal: plan.estimatedCost,
      discountAmount: plan.discount,
      totalAmount: plan.totalCost,
      paidAmount: 0,
      balance: plan.totalCost,
      status: 'Issued',
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
    });

    res.status(201).json(invoice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
