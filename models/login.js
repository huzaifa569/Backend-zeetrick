import pool from './db.js';

export const validateLogin = {
  email: { type: 'string', required: true, format: 'email' },
  password: { type: 'string', required: true, minLength: 6 }
};

export const findUserByEmail = async (email) => {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    return rows;
  } finally {
    connection.release();
  }
};