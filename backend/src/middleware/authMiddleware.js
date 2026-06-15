import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';


export const protect = async (req, res, next) => {
  let token;

  // Retrieve token from http-only cookie
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, no session token found' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from database, excluding the password field
    req.user = await User.findById(decoded.userId).select('-password');

    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Not authorized, user no longer exists' });
    }

    next();
  } catch (error) {
    console.error(`Token verification failure: ${error.message}`);
    return res.status(401).json({ success: false, message: 'Not authorized, session token is invalid or expired' });
  }
};
