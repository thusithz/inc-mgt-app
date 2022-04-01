import User from '@user/user.model';
import bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

const JWT_KEY = process.env.JWT_SECRET || '';

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw errors;
  }
  console.log('signup Req');
  const { username, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    // const error = new HttpError(
    //   'Signing up failed, please try again later.',
    //   500
    // );
    return next(err);
  }
  console.log('existingUser', existingUser);
  if (existingUser) {
    // const error = new HttpError(
    //   'User exists already, please login instead.',
    //   422
    // );
    return next(new Error('User exists already, please login instead.'));
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    // const error = new HttpError(
    //   'Could not create user, please try again.',
    //   500
    // );
    return next(err);
  }

  const createdUser = new User({
    username,
    email,
    password: hashedPassword,
    places: [],
  });

  try {
    await createdUser.save();
  } catch (err) {
    // const error = new HttpError(
    //   'Signing up failed, please try again later.',
    //   500
    // );
    return next(err);
  }

  let token;
  try {
    token = jwt.sign({ userId: createdUser.id, email: createdUser.email }, JWT_KEY, { expiresIn: '1h' });
  } catch (err) {
    // const error = new HttpError(
    //   'Signing up failed, please try again later.',
    //   500
    // );
    return next(err);
  }

  res.status(201).json({ userId: createdUser.id, email: createdUser.email, token: token });
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    // const error = new HttpError(
    //   'Logging in failed, please try again later.',
    //   500
    // );
    return next(err);
  }

  if (!existingUser) {
    // const error = new HttpError(
    //   'Invalid credentials, could not log you in.',
    //   403
    // );
    return next(new Error('Invalid credentials, could not log you in.'));
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    return next(err);
  }

  if (!isValidPassword) {

    return next(new Error('Invalid credentials, could not log you in.'));
  }

  let token;
  try {
    token = jwt.sign({ userId: existingUser.id, email: existingUser.email }, JWT_KEY, { expiresIn: '1h' });
  } catch (err) {
    return next(err);
  }

  res.json({
    username: existingUser.username,
    email: existingUser.email,
    token: token,
  });
};
