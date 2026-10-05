import bcrypt from 'bcryptjs';
import pool from './db.js';

export const findUserByEmail = async (email) => {
  if (typeof email !== 'string') {
    throw new TypeError('Email must be a string');
  }

  const normalizedEmail = email.trim().toLowerCase();
  const [rows] = await pool.query(
    'SELECT * FROM users WHERE LOWER(email) = ?',
    [normalizedEmail]
  );

  return rows;
};

export const createUser = async (userData) => {
  const { firstName, lastName, email, age, gender, password } = userData;
  const normalizedEmail = email.trim().toLowerCase();
  const hashedPassword = await bcrypt.hash(password, 10);

  const [result] = await pool.query(
    'INSERT INTO users (firstName, lastName, email, age, gender, password) VALUES (?, ?, ?, ?, ?, ?)',
    [firstName, lastName, normalizedEmail, age, gender, hashedPassword]
  );

  return {
    id: result.insertId,
    firstName,
    lastName,
    email: normalizedEmail,
    age,
    gender
  };
};

export default { findUserByEmail, createUser };
