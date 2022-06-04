import mongoose, { Schema, model, Types } from 'mongoose';

export interface IProduct {
  _id: string | Types.ObjectId,
  code: string,
  name: string;
  category?: string | Types.ObjectId,
  discountPercent?: number;
}

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  category: { type: Schema.Types.ObjectId, ref: 'category' },
  discountPercent: Number,
});



const Product = model<IProduct>('Product', productSchema);

export default Product;