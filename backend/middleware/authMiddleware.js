const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'Access denied! Please login first.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(401).json({ message: 'User not found!' });
    }

    if (user.isBlocked) {
      return res.status(403).json({ message: 'Account is blocked! Contact admin.' });
    }

    req.user = user;
    next();

  } catch (error) {
    res.status(401).json({ message: 'Invalid token! Please login again.' });
  }
};

module.exports = { protect };