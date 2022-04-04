import * as mongoose from 'mongoose';
import User from './user.interface';

const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  department: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const UserModel = mongoose.model<User & mongoose.Document>('User', userSchema);

export default UserModel;
