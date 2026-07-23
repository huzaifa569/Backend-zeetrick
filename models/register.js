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

export const registerSchema = {
  firstName: { type: 'string', required: true },
  lastName: { type: 'string', required: true },
  email: { type: 'string', required: true, format: 'email' },
  age: { type: 'number', required: true, min: 0 },
  gender: { type: 'string', required: true, enum: ['Male', 'Female', 'Other'] },
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

export const createUser = async (userData) => {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.execute(
      'INSERT INTO users (firstName, lastName, email, age, gender, password) VALUES (?, ?, ?, ?, ?, ?)',
      [userData.firstName, userData.lastName, userData.email, userData.age, userData.gender, userData.password]
    );
    return { id: result.insertId, ...userData };
  } finally {
    connection.release();
  }
};

export default { registerSchema, findUserByEmail, createUser };