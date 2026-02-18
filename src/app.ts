import dotenv from 'dotenv';
dotenv.config();

import authRoutes from './routes/authRoute';
import userRoutes from './routes/userRoute';
import productRoutes from './routes/productRoute';
import { testConnection } from './infrastructure/database/database';
import { HttpServer } from './infrastructure/http/httpServer';

console.log(testConnection() );
const server = new HttpServer();
const PORT = process.env.PORT;

server.mount('/api/auth', authRoutes.getRouter());
server.mount('/api/users', userRoutes.getRouter());
server.mount('/api/products', productRoutes.getRouter());

server.listen(PORT || '3000', () => {
  console.log(`Server is running http://localhost:${PORT}`);
});
// app.use(cors());
// app.use(express.json());
// app.use(cookieParser());
// // Rutas
// app.use('/api/auth', authRoutes);
// app.use('/api/usuarios', usuariosRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/clientes', clienteRoutes);

// app.listen(PORT, () => {
//   console.log(`Servidor API corriendo en http://localhost:${PORT}`);
// });

export default server;
