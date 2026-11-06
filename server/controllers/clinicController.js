const Clinic = require('../models/Clinic');
const Branch = require('../models/Branch');
const User = require('../models/User');

exports.getClinicProfile = async (req, res) => {
  try {
    const clinic = await Clinic.findById(req.clinicId);
    const branches = await Branch.find({ clinicId: req.clinicId });
    const staff = await User.find({ clinicId: req.clinicId }).select('-password');

    res.json({ clinic, branches, staff });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateClinicSettings = async (req, res) => {
  try {
    const clinic = await Clinic.findByIdAndUpdate(req.clinicId, req.body, { new: true });
    res.json(clinic);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createBranch = async (req, res) => {
  try {
    const branch = await Branch.create({ ...req.body, clinicId: req.clinicId });
    res.status(201).json(branch);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createStaffUser = async (req, res) => {
  try {
    const bcrypt = require('bcryptjs');
    const { name, email, password, role, phone, specialisation, branchId } = req.body;

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) return res.status(400).json({ message: 'Email already in use' });

    const hashedPassword = await bcrypt.hash(password || 'Smilux123!', 10);
    const user = await User.create({
      clinicId: req.clinicId,
      branchId,
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role,
      phone,
      specialisation
    });

    const safeUser = user.toObject();
    delete safeUser.password;
    res.status(201).json(safeUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
