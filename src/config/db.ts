import pkg from 'pg';
import { ENV } from './environment';
const { Pool } = pkg;

const DB_USER     = ENV.DB_USER;
const DB_HOST     = ENV.DB_HOST;
const DB_PASSWORD = ENV.DB_PASSWORD;
const DB_NAME     = ENV.DB_NAME;
const DB_PORT     = ENV.DB_PORT;

export const pool = new Pool({
  user: DB_USER,
  host: DB_HOST,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: DB_PORT,
  // ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});
