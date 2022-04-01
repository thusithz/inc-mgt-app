import Auth from '@middleware/auth';
import * as userController from '@user/user.controller';
import express from 'express';

const router = express.Router();

router.post('/list', Auth, userController.signup);

router.post('/signup', userController.signup);

router.post('/login', userController.login);

export default router;
