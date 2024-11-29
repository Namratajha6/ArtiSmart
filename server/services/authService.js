import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { validateEmail, validatePassword } from '../utils/validation.js';

export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
};

export const registerUser = async (userData) => {
  if (!validateEmail(userData.email)) {
    throw new Error('Invalid email format');
  }

  if (!validatePassword(userData.password)) {
    throw new Error('Password must be at least 6 characters long');
  }

  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new Error('Email already registered');
  }

  const user = new User(userData);
  await user.save();

  const token = generateToken(user._id);
  return { user, token };
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  
  if (!user || !(await user.comparePassword(password))) {
    throw new Error('Invalid credentials');
  }

  const token = generateToken(user._id);
  return { user, token };
};