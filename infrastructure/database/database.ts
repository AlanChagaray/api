import pkg from 'pg';
const { Pool } = pkg;

console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);

export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  // ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});
