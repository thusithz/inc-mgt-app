import { NextFunction, Request, Response } from 'express';

export const notFoundHandler = (request: Request, response: Response, next: NextFunction) => {
  response.status(404);
  next("Not Found :'(");
};
