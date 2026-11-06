const Clinic = require('../models/Clinic');
const User = require('../models/User');
const Subscription = require('../models/Subscription');

exports.getAdminDashboard = async (req, res) => {
  try {
    const [totalClinics, activeClinics, totalUsers, subscriptions] = await Promise.all([
      Clinic.countDocuments(),
      Clinic.countDocuments({ isSubscriptionActive: true }),
      User.countDocuments(),
      Subscription.find().populate('clinicId', 'name email code')
    ]);

    res.json({
      totalClinics,
      activeClinics,
      suspendedClinics: totalClinics - activeClinics,
      totalUsers,
      subscriptions
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
