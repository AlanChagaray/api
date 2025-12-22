import jwt from 'jsonwebtoken';
const API_KEY = process.env.JWT_SECRET || '@dMinSysTem';

export const validarToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Bearer <token>
  if (!token) return res.status(401).json({ message: 'Token requerido.' });

  try {
    const decoded = jwt.verify(token, API_KEY);
    req.user = decoded; // { id, usuario, rol, tenant_id }
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido.' });
  }
};
