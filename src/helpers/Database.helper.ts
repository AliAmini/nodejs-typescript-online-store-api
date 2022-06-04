import mongoose from "mongoose";


export const connectDatabase = async () => {
  /**
   * Database Activation
   */
  const DATABASE_URL = process.env.DATABASE_URL;
  if (!DATABASE_URL) {
    console.error('ERROR: You need to specify `DATABASE_URL` in .env file.');
    process.exit(1);
  }

  await mongoose
    .connect(DATABASE_URL);
  
  console.log('\nMongoDb connection status: Connected ✅✅✅\n');
};