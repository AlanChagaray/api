const {Sequelize} = require('sequelize');

export const sequelize = new Sequelize(
  process.env.DB_NAME || 'database',
  process.env.DB_USER || 'username',
  process.env.DB_PASSWORD || 'password',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
    logging: false,
    // dialectOptions: process.env.NODE_ENV === 'production' ? {
    //   ssl: {
    //     require: true,
    //     rejectUnauthorized: false
    //   }
    // } : {}
  }
);

export const testConnection = async () => {
try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}};

