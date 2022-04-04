import debug, { IDebugger } from 'debug';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ExtendReq } from '../types/request';

const JWT_KEY = process.env.JWT_SECRET || '!@#$%^&*';

const log: IDebugger = debug('middleware:JWT');

type Decoded = {
  userId: string;
};

const Auth = (req: Request & ExtendReq, res: Response, next: NextFunction) => {
  log('JWT', JWT_KEY);

  const token = req.headers.authorization?.split(' ')[1];
  if (token) {
    jwt.verify(token, JWT_KEY, (error, decoded) => {
      if (error) {
        log('JWT: Error', error);

        res.status(404).json({
          message: error,
          error,
        });
      }
      const userInfo = decoded as Decoded;
      req.userId = userInfo.userId;
      next();
    });
  } else {
    res.status(401).json({
      message: 'Unauthorized',
    });
  }
};

export default Auth;
