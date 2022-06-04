import bcrypt from "bcrypt";

export const hashPassword = async (plainTextPassword: string) => {
  const hash = await bcrypt.hash(plainTextPassword, 10);

  return hash;
};

export const compairePassword = async (plainTextPassword: string, hash: string): Promise<Boolean> => {
  const isTheSame = await bcrypt.compare(plainTextPassword, hash);
  return isTheSame;
};