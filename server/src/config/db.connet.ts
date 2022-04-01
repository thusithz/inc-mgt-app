import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config({});

mongoose.Promise = global.Promise;

const db: string = process.env.MONGO_URL || '';

export default () => {
  const connect = () => {
    mongoose
      .connect(db, { useNewUrlParser: true, useCreateIndex: true })
      .then(() => {
        return console.info(`Successfully connected to ${db}`);
      })
      .catch((err) => {
        console.error(`Error connecting to database :`, err);
        return process.exit(1);
      });
  };

  connect();

  mongoose.connection.on('disconnected', connect);
};
