module.exports = {
  isLoggedIn: (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      return res.status(403).json({ message: 'Forbidden' });
    }
  },
  isLoggedOut: (req, res, next) => {
    if (req.isAuthenticated()) {
      return res.status(403).json({ message: 'Forbidden' });
    } else {
      next();
    }
  },
  isAdmin: (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === 'admin') {
      next();
    } else {
      return res.status(403).json({ message: 'Forbidden' });
    }
  },
};
