import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


export interface AuthenticatedRequest extends Request {
  user?: any; // Optional: replace `any` with your own User type
}

export const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1]; // Bearer <token>

  const secret = process.env.JWT_SECRET;

  if (!token) {
    res.status(401).json({ message: 'Access token missing' });
    return; //Stop further execution
  }

  if (!secret) {
    res.status(500).json({ message: 'JWT secret is not defined in environment' });
    return;
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};
