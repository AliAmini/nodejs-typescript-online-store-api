import bcrypt from "bcrypt";
import { sign, verify, SignOptions, VerifyOptions } from 'jsonwebtoken';
import { IUser } from "@models/User/User.model";

export interface ITokenPayload extends Omit<IUser, 'password'> {
  iat?: number;
}


export const hashPassword = async (plainTextPassword: string) => {
  const hash = await bcrypt.hash(plainTextPassword, 10);

  return hash;
};

export const comparePassword = async (plainTextPassword: string, hash: string): Promise<Boolean> => {
  const isTheSame = await bcrypt.compare(plainTextPassword, hash);
  return isTheSame;
};


export const createJWT = (user: IUser) : string => {
  const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY;
  if (!JWT_PRIVATE_KEY) {
    console.error('ERROR: You need to specify `JWT_PRIVATE_KEY` in .env file.');
    process.exit(1);
  }

  const payload: ITokenPayload = {
    _id: user._id,
    name: user.name,
    email: user.email
  };


  // generate JWT
  return sign(payload, JWT_PRIVATE_KEY);
};

export const validateJWT = (token: string) : Promise<ITokenPayload> => {
  const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY;
  if (!JWT_PRIVATE_KEY) {
    console.error('ERROR: You need to specify `JWT_PRIVATE_KEY` in .env file.');
    process.exit(1);
  }

  return new Promise((resolve, reject) => {
    verify(token, JWT_PRIVATE_KEY, (error, decoded: any) => {
      console.log('===== decoded', decoded);
      if (error) return reject(error);

      resolve(decoded as ITokenPayload);
    })
  });
};