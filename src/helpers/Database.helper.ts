import mongoose from "mongoose";


export const connectDatabase = async () => {
  console.log('MongoDB connection status: start to connecting...');
  
  /**
   * Database Activation
   */
  const DATABASE_URL = process.env.DATABASE_URL;
  if (!DATABASE_URL) {
    console.error('ERROR: You need to specify `DATABASE_URL` in .env file.');
    process.exit(1);
  }

  const connection = await mongoose
    .connect(DATABASE_URL);
  
  console.log('\nMongoDB connection status: Connected ✅✅✅\n');

  return connection;
};