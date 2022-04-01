import User from '@user/user.interface';
import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
});

const UserModel = mongoose.model<User & mongoose.Document>('User', userSchema);

export default UserModel;
