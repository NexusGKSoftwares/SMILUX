const tenant = (req, res, next) => {
  if (!req.clinicId && req.user?.role !== 'SuperAdmin') {
    return res.status(403).json({ message: 'Tenant access error: Clinic scope missing' });
  }
  next();
};

module.exports = tenant;
