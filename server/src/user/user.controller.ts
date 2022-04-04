import bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import User from './user.model';

const JWT_KEY = process.env.JWT_SECRET || '';

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  const {
    username, email, password, department,
  } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return next(err);
  }

  if (existingUser) {
    return res.status(400).json({
      success: false,
      error: 'User exists already, please login instead.',
    });
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return next(err);
  }

  const createdUser = new User({
    username,
    email,
    password: hashedPassword,
    department,
  });

  try {
    await createdUser.save();
  } catch (err) {
    return next(err);
  }

  return res.status(201).json({ success: true, data: { userId: createdUser.id, email: createdUser.email } });
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: 'Something went wrong',
    });
  }
  if (!existingUser) {
    return res.status(400).json({
      success: false,
      error: 'Invalid credentials, could not log you in.',
    });
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    return next(err);
  }

  if (!isValidPassword) {
    return res.status(400).json({
      success: false,
      error: 'Invalid credentials, could not log you in.',
    });
  }

  let token;
  try {
    token = jwt.sign({ userId: existingUser.id, email: existingUser.email }, JWT_KEY, { expiresIn: '1h' });
  } catch (err) {
    return next(err);
  }
  return res.status(200).json({
    success: true,
    data: {
      username: existingUser.username,
      email: existingUser.email,
      token,
    },
  });
};

export const userList = async (req: Request, res: Response, next: NextFunction) => {
  let users;
  try {
    users = await User.find({}, '-password');
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Fetching data failed, please try again later.',
    });
  }
  res.json({
    success: true,
    data: users,
  });
};
