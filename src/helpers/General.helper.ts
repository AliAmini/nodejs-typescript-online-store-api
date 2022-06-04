import mongoose from "mongoose";

export const getNewObjectId = () : mongoose.Types.ObjectId => {
  const newObjectId = new mongoose.Types.ObjectId();
  return newObjectId;
}