/* eslint-disable no-console */
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, {
  Express, NextFunction, Request, Response,
} from 'express';
import helmet from 'helmet';
import connetction from './config/db.connet';
import { errorHandler } from './middleware/error';
import { notFoundHandler } from './middleware/not.found';
import UsersRoutes from './user/user.routes';

dotenv.config({});

const app: Express = express();

const { PORT } = process.env;

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
});

app.use('/api/user', UsersRoutes);

app.use(errorHandler);
app.use(notFoundHandler);

// DB Connection
connetction();

app.use((error: unknown, req: Request, res: Response) => {
  res.status(500).json({
    success: false,
    error: "Something went wrong ;'(",
  });
});

app.listen(PORT, () => {
  console.log(`inc mgt server is running on PORT ${PORT}`);
});
