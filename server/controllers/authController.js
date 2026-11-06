const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Clinic = require('../models/Clinic');
const Branch = require('../models/Branch');

const secret = process.env.JWT_SECRET || 'smilux_secret_key_2026';

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email: email.toLowerCase() }).populate('clinicId');
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (!user.isActive) {
      return res.status(403).json({ message: 'Account is deactivated' });
    }

    user.lastLogin = new Date();
    await user.save();

    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        clinicId: user.clinicId?._id || user.clinicId,
        branchId: user.branchId
      },
      secret,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        clinic: user.clinicId
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.registerClinic = async (req, res) => {
  try {
    const { clinicName, ownerName, email, password, phone } = req.body;
    if (!clinicName || !ownerName || !email || !password || !phone) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const code = clinicName.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6) + Math.floor(100 + Math.random() * 900);

    const clinic = await Clinic.create({
      name: clinicName,
      code,
      phone,
      email: email.toLowerCase()
    });

    const branch = await Branch.create({
      clinicId: clinic._id,
      name: `${clinicName} Main Branch`,
      code: 'MAIN',
      phone,
      email: email.toLowerCase(),
      isMainBranch: true
    });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      clinicId: clinic._id,
      branchId: branch._id,
      name: ownerName,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: 'ClinicOwner',
      phone
    });

    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        clinicId: clinic._id,
        branchId: branch._id
      },
      secret,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        clinic
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('clinicId').select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
