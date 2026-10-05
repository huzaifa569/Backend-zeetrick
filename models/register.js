import { createUser, findUserByEmail } from './login.js';

export const registerSchema = {
  firstName: { type: 'string', required: true },
  lastName: { type: 'string', required: true },
  email: { type: 'string', required: true, format: 'email' },
  age: { type: 'number', required: true, min: 0 },
  gender: { type: 'string', required: true, enum: ['Male', 'Female', 'Other'] },
  password: { type: 'string', required: true, minLength: 6 }
};

export { createUser, findUserByEmail };

export default { registerSchema, findUserByEmail, createUser };