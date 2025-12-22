import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoute.js';
import usuariosRoutes from './routes/usuariosRoute.js';
import userRoutes from './routes/userRoute.js';
import clienteRoutes from './routes/clienteRoute.js';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/users', userRoutes);
app.use('/api/clientes', clienteRoutes);

app.listen(PORT, () => {
  console.log(`Servidor API corriendo en http://localhost:${PORT}`);
});

export default app;
