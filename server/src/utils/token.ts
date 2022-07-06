import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const { JWT_SECRET } = process.env;

export const generateJWT = (obj: Record<string, unknown>) => {
  return jwt.sign(obj, JWT_SECRET, { expiresIn: '7d' });
};
