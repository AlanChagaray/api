
import { ENV } from '../config/environment';
import jwt, { SignOptions } from 'jsonwebtoken';

const EXPIRES_IN : SignOptions['expiresIn'] = '8h';

export function generateToken(payload : any, expiresIn = EXPIRES_IN) {
  try {
    return jwt.sign(payload, ENV.API_KEY, { expiresIn });
  } catch (error) {
    console.log('Token generation error:', error);
    return null;
  }
}

export function verifyToken(token: string) {
  try {
     return jwt.verify(token, ENV.API_KEY, { clockTolerance: 60 });
  } catch (error) {
    console.log('Token verification error:', error);
    return null;
  }
}
