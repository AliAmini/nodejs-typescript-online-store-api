import { hashPassword } from '@helpers/Auth.helper';
import { Schema, model, Types } from 'mongoose';

export interface IUser {
  _id: string | Types.ObjectId,
  name: string;
  email: string;
  password: string,
  avatar?: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, },
  password: { type: String, required: true },
  avatar: String
});


// Hashing Password
userSchema.pre('save', async function() {
  if(this.isNew) {
    const plainTextPassword = this.password;
    const hashedPassword = await hashPassword(plainTextPassword);

    this.password = hashedPassword;
  }
});

const User = model<IUser>('User', userSchema);

export default User;