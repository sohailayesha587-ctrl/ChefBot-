const jwt = require('jsonwebtoken');
const User = require('../models/User');
const adminProtect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }
    if (user.email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({ success: false, message: 'Admin access only' });
    }
    req.user = user;
    next();
  } catch (err) {
    console.error('adminProtect error:', err);
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

module.exports = { adminProtect };