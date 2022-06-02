import { Schema, model } from 'mongoose';

export interface IUser {
  _id: string,
  name: string;
  email: string;
  password: string,
  avatar?: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatar: String
});



const User = model<IUser>('User', userSchema);

export default User;