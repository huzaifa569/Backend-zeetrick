import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { findUserByEmail, createUser } from '../models/register.js';

const register = async (req, res) => {
    const { firstName, lastName, email, gender, age, password } = req.body;
    const parsedAge = Number(age);

    if (!firstName || !lastName || !email || !gender || !age || !password) {
        return res.status(400).json({
            success: false,
            message: 'All fields are required.'
        });
    }

    const validGenders = ['Male', 'Female', 'Other'];
    if (!validGenders.includes(gender)) {
        return res.status(400).json({
            success: false,
            message: 'Gender must be Male, Female, or Other'
        });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid email format'
        });
    }

    if (password.length < 6) {
        return res.status(400).json({
            success: false,
            message: 'Password must be at least 6 characters long'
        });
    }

    if (Number.isNaN(parsedAge) || parsedAge < 0) {
        return res.status(400).json({
            success: false,
            message: 'Age must be a positive number'
        });
    }

    try {
        const existingUsers = await findUserByEmail(email);
        if (existingUsers.length > 0) {
            return res.status(409).json({
                success: false,
                message: 'User with this email already exists'
            });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        const newUser = await createUser({
            firstName,
            lastName,
            age: parsedAge,
            email,
            gender,
            password: hashedPassword
        });

        const token = jwt.sign(
            {
                userId: newUser.id,
                email: newUser.email,
                firstName: newUser.firstName
            },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 
        });

      
        return res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: {
                user: {
                    id: newUser.id,
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    email: newUser.email,
                    age: newUser.age,
                    gender: newUser.gender
                },
                token
            }
        });
    } catch (error) {
        console.error('Signup error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            // error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

export default register;