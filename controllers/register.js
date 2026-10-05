import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail } from '../models/login.js';

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, age, gender, password } = req.body || {};
    const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';

    if (
      typeof firstName !== 'string' || !firstName.trim() ||
      typeof lastName !== 'string' || !lastName.trim() ||
      !normalizedEmail ||
      age === undefined || age === null || age === '' ||
      typeof gender !== 'string' || !gender ||
      typeof password !== 'string' || !password
    ) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required!'
      });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    const parsedAge = Number(age);
    if (!Number.isInteger(parsedAge) || parsedAge < 0) {
      return res.status(400).json({
        success: false,
        message: 'Age must be a non-negative integer'
      });
    }

    if (!['Male', 'Female', 'Other'].includes(gender)) {
      return res.status(400).json({
        success: false,
        message: 'Gender must be Male, Female, or Other'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }

    const existingUsers = await findUserByEmail(normalizedEmail);
    if (existingUsers.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'Email already registered'
      });
    }

    const user = await createUser({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: normalizedEmail,
      age: parsedAge,
      gender,
      password
    });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );

    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user
    });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({
        success: false,
        message: 'Email already registered'
      });
    }

    console.error('Register error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export default register;
