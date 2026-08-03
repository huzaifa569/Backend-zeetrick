import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

const host = process.env.DB_HOST || 'localhost';
const user = process.env.DB_USER || 'root';
const password = process.env.DB_PASSWORD || 'sayyousayme@123';
const database = process.env.DB_NAME || 'zeetrick';

export const isDatabaseConfigured = () => {
  if (isProduction) {
    return Boolean(process.env.DB_HOST && process.env.DB_USER && process.env.DB_PASSWORD && process.env.DB_NAME);
  }
  return true;
};

const pool = mysql.createPool({
  host,
  user,
  password,
  database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
