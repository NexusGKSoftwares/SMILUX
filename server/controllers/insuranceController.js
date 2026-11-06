const InsuranceProvider = require('../models/InsuranceProvider');
const InsuranceClaim = require('../models/InsuranceClaim');

exports.getProviders = async (req, res) => {
  try {
    const providers = await InsuranceProvider.find({ clinicId: req.clinicId }).sort({ name: 1 });
    res.json(providers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createProvider = async (req, res) => {
  try {
    const provider = await InsuranceProvider.create({ ...req.body, clinicId: req.clinicId });
    res.status(201).json(provider);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getClaims = async (req, res) => {
  try {
    const claims = await InsuranceClaim.find({ clinicId: req.clinicId })
      .populate('providerId', 'name code')
      .populate('patientId', 'firstName lastName patientNumber shaNumber')
      .sort({ createdAt: -1 });
    res.json(claims);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createClaim = async (req, res) => {
  try {
    const { providerId, patientId, invoiceId, amountClaimed, shaRefNumber, notes } = req.body;
    const count = await InsuranceClaim.countDocuments({ clinicId: req.clinicId });
    const claimNumber = `CLM-${new Date().getFullYear()}-${String(count + 1).padStart(4, '0')}`;

    const claim = await InsuranceClaim.create({
      clinicId: req.clinicId,
      providerId,
      patientId,
      invoiceId,
      claimNumber,
      amountClaimed,
      shaRefNumber: shaRefNumber || '',
      notes: notes || '',
      status: 'Submitted'
    });

    res.status(201).json(claim);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateClaimStatus = async (req, res) => {
  try {
    const { status, amountApproved } = req.body;
    const claim = await InsuranceClaim.findOneAndUpdate(
      { _id: req.params.id, clinicId: req.clinicId },
      { status, amountApproved: amountApproved || 0 },
      { new: true }
    );
    if (!claim) return res.status(404).json({ message: 'Claim not found' });
    res.json(claim);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
