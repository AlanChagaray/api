import jwt from 'jsonwebtoken';

const API_KEY = process.env.API_KEY;

export function generateToken(payload, expiresIn = '600s') {
  return jwt.sign(payload, API_KEY, { expiresIn });
}

export function verifyToken(token) {
  return jwt.verify(token, API_KEY);
}
