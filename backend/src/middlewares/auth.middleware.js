// middlewares/authMiddleware.js
import jwt from 'jsonwebtoken';
import { APIError } from '../utils/APIError.js';

export const authenticateToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  
  if (!token) {
    throw new APIError(401 , "Access token required")
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
    
      throw new APIError(401 , "Invalid Token")
    }
    req.user = user;
  
    next();
  });
};

export const authorizeRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
    console.log(req.user.role);
    console.log(role);
      throw new APIError(403 , "Access denied")
    }
    next();
  };
};
