import debug, { IDebugger } from 'debug';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const JWT_KEY = process.env.JWT_SECRET || '!@#$%^&*';

const log: IDebugger = debug('middleware:JWT');

const Auth = (req: Request, res: Response, next: NextFunction) => {
  log('JWT', JWT_KEY);

  let token = req.headers.authorization?.split(' ')[1];

  if (token) {
    return jwt.verify(token, JWT_KEY, (error, decoded) => {
      if (error) {
        log('JWT: Error', error);

        return res.status(404).json({
          message: error,
          error,
        });
      } else {
        res.locals.jwt = decoded;
        return next();
      }
    });
  } else {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }
};

export default Auth;
