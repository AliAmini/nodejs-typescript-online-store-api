import { Schema, model } from 'mongoose';

export interface IProduct {
  _id: string,
  name: string;
  category?: string,
  discountPercent?: number;
}

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'category' },
  discountPercent: Number,
});



const Product = model<IProduct>('Product', productSchema);

export default Product;