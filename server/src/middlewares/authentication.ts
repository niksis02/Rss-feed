import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const { JWT_SECRET } = process.env;

export const jwtAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers['authorization']?.replace('Bearer ', '');
    if (!token)
      return res.status(401).json({
        status: 'error',
        message: 'Missing access token',
      });
    const user = jwt.verify(token, JWT_SECRET);
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    return res.status(403).json({
      status: 'error',
      message: 'Authorization failed',
    });
  }
};
