import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const extractToken = (authHeader) => {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.substring(7);
};

const protect = async (req, res, next) => {
  let token = extractToken(req.headers.authorization);

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized, no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Unauthorized, token failure' });
  }
};

export { protect };
