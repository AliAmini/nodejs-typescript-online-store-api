import { Schema, model } from 'mongoose';

export interface ICategory {
  _id: string,
  name: string;
  parent?: string,
  discountPercent?: number;
}

const categortySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  parent: { type: Schema.Types.ObjectId, ref: 'category' },
  discountPercent: Number,
});



const Category = model<ICategory>('Category', categortySchema);

export default Category;