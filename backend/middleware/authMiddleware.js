import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// ✅ Middleware to protect routes with JWT
export const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (err) {
    console.error('Auth error:', err);
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};

// ✅ Middleware to allow only Admins
export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied: Admins only' });
  }
};

// ✅ Alias for adminOnly in case you use isAdmin in some files
export const isAdmin = adminOnly;
