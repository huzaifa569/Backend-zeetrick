import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'sayyousayme@123',
  database: 'zeetrick',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

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