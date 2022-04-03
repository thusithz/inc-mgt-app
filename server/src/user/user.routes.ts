import express from 'express';
import { body } from 'express-validator';
import Auth from '../middleware/auth';
import * as userController from './user.controller';

const router = express.Router();

router.post('/list', Auth, userController.signup);

router.post(
  '/signup',
  body('username').not().isEmpty().trim()
    .escape(),
  body('department').not().isEmpty().trim()
    .escape(),
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({
    min: 6,
  }),
  userController.signup,
);

router.post(
  '/login',
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({
    min: 6,
  }),
  userController.login,
);

export default router;
