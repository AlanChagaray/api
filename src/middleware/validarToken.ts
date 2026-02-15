import { HttpRequest } from '@/types/HttpRequest';
import { ENV } from '../config/environment';
import { Response } from 'express';
import jwt from 'jsonwebtoken';

export const validarToken = (req: HttpRequest, res: Response, next: any) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Bearer <token>
  if (!token) return res.status(401).json({ message: 'Token requerido.' });

  try {
    const decoded = jwt.verify(token, ENV.API_KEY);
    req.user = decoded as any; // { id, usuario, rol, tenant_id }
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido.' });
  }
};
